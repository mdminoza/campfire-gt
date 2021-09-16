/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Layout, Grid, Modal, Button, Result } from 'antd';
import { useNavigate, usePrompt } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery, useMutation } from 'react-query';
import io from 'socket.io-client';
import Peer from 'simple-peer';

import { ErrorModal } from '../../HOCs/ErrorModal';
import { ToastMessage } from '../../HOCs/ToastMessage';
import { AntdMessage } from '../../HOCs/AntdMessage';
import { ActiveResult } from '../../atoms/ActiveResult';
import { Loader } from '../../atoms/Loader';
import { TitleContent } from '../../molecules/TitleContent';
import { MemberItemParams } from '../../molecules/MemberItem/types';
import { SpeakersArea } from '../../organisms/SpeakersArea';
import { CampfireFooter } from '../../organisms/CampfireFooter';
import { MembersList } from '../../organisms/MembersList';

import { useQueryData } from '../../../hooks/common';
import { useCampfireAction } from '../../../hooks/campfire';
import { useMemberAction } from '../../../hooks/member';
import { useUserState } from '../../../hooks/user';
import { decipherText } from '../../../utils/helpers/crypto';

import { MemberParams } from '../../../../common/domain/entities/member';

const ActiveSpeakersWrapper = styled.div`
  margin: -70px 0 24px;
  z-index: 1;
`;

const AudienceWrapper = styled.div`
  margin: 0 40px 150px;
  @media (max-width: 500px) {
    margin: 0 0 100px;
  }
`;

const NotSupportedContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const { useBreakpoint } = Grid;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const ActiveTemplate = () => {
  const [isRaising, setHandRaised] = useState(false);
  const [selectedId, setSelectedId] = useState<string>('');
  const [peers, setPeers] = useState<any>(undefined);
  const [isMediaSupported, setIsMediaSupported] = useState<boolean>(true);
  const [avatarSize, setAvatarSize] = useState<number>();
  const [breakPoint, setBreakPoint] = useState<string>('');
  const [isInvalidDecryptedValue, setInvalidDecryptedValue] = useState<boolean>(
    false,
  );
  const [activeCampfireId, setActiveCampfireId] = useState<string>('');
  const [activeUser, setActiveUser] = useState<
    | { campfireId: string; name: string; profileUrl: string; uid: string }
    | undefined
  >(undefined);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isEndCampfireModal, setEndCampfireModal] = useState(false);
  const [isPrompt, setPrompt] = useState(false);
  const [isEndedCampfire, setEndedCampfire] = useState(false);

  const screens = useBreakpoint();
  const {
    fetchCampfire,
    fetchCampfireMembers,
    deleteCampfire,
  } = useCampfireAction();
  const { fetchMember, updateMemberStatus, deleteMember } = useMemberAction();
  const { activeCampfire, setActiveCampfire } = useUserState();
  const { data } = useQueryData();
  const navigate = useNavigate();
  const userVideo = useRef<any>();
  const peersRef = useRef<any>([]);

  // https://staging-campfire-api.azurewebsites.net
  // http://localhost:5000
  const socket = io('https://staging-campfire-api.azurewebsites.net', {
    // TODO: Need more research for the proper socket options
    // transports: ['websocket'],
  });

  const peerValues = [...Object.values(peers || {})] as {
    userId: string;
    socketId: string;
  }[];
  const filteredPeers = peerValues.filter(
    (userVal) => userVal.userId !== activeUser?.uid,
  );

  useEffect(() => {
    const fooz = Object.entries(screens).filter((screen) => !!screen[1]);
    try {
      setBreakPoint(fooz[fooz.length - 1][0]);
    } catch (err) {
      console.log(err);
    }
  }, [screens]);

  const {
    refetch: refetchCampfire,
    data: campfire,
    isLoading: isFetchingCampfireLoading,
    error: fetchingCampfireError,
  } = useQuery(
    ['campfire', activeCampfireId],
    () => fetchCampfire(activeCampfireId),
    {
      onError: () => {
        ErrorModal('Oops, something went wrong!', () => {
          navigate(`/campfires`);
        });
      },
      enabled: false,
    },
  );

  const {
    refetch: refetchCampfireMember,
    data: campfireMember,
    isLoading: isFetchingCampfireMemberLoading,
    error: fetchingCampfirememberError,
  } = useQuery(
    ['campfire-member', activeCampfireId, activeUser?.uid],
    () => fetchMember({ uid: activeUser?.uid || '', id: activeCampfireId }),
    {
      onError: () => {
        ErrorModal('Oops, something went wrong!', () => {
          navigate(`/campfires`);
        });
      },
      enabled: false,
    },
  );

  const {
    refetch: refetchCampfireMembers,
    data: campfireMembers,
    isLoading: isFetchingCampfireMembersLoading,
  } = useQuery(
    ['campfire-members', activeCampfireId],
    () => fetchCampfireMembers(activeCampfireId),
    // {
    //   onSuccess: (res) => {
    //     console.log(res, 'active campfire members');
    //   },
    //   onError: (err: any) => {
    //     console.log(err, 'err fetching campfire member');
    //   },
    // },
  );

  const createPeer = (
    callerId: string,
    stream: any,
    userDetail: any,
    memberId: string,
  ) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      streams: [stream],
    });
    peer.on('signal', (signal: any) => {
      socket.emit('send new user joined', {
        callerId,
        userDetail,
        peerSignal: signal,
        memberId,
      });
    });
    // peer._debug = console.log;
    return peer;
  };

  const addPeer = (
    incomingSignal: any,
    callerID: string,
    userId: string,
    stream: any,
    memberId: string,
  ) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      streams: [stream],
    });

    peer.on('signal', (signal: any) => {
      socket.emit('returning signal', { signal, userId, callerID, memberId });
    });

    peer.signal(incomingSignal);
    // peer._debug = console.log;
    return peer;
  };

  useEffect(() => {
    if (data) {
      try {
        const decryptedData = decipherText(data);
        setInvalidDecryptedValue(false);
        setActiveCampfireId(decryptedData.data.campfireId);
        setActiveUser(decryptedData.data);
        setPrompt(true);
      } catch (error) {
        setInvalidDecryptedValue(true);
      }
    }
  }, []);

  useEffect(() => {
    if (activeCampfireId) {
      refetchCampfire();
      refetchCampfireMember();
    }
  }, [activeCampfireId, refetchCampfire, refetchCampfireMember]);

  useEffect(() => {
    const onClickEvent = (e: any) => {
      if (e.target && e.target.id !== '_memberCard') {
        setSelectedId('');
      }
    };
    if (selectedId) {
      window.addEventListener('click', onClickEvent);
    }
  }, [selectedId]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (
      activeCampfireId === campfire?._id &&
      activeCampfire === activeCampfireId
    ) {
      let userVideoStream: any;
      if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        setIsMediaSupported(false);
        return;
      }
      navigator.mediaDevices
        .getUserMedia({ video: false, audio: true })
        .then((stream) => {
          setErrorMsg('');
          userVideo.current = {
            srcObject: stream,
          };

          userVideoStream = userVideo.current;

          socket.emit('join room', {
            campfireId: activeCampfireId,
            userId: activeUser?.uid,
            userName: activeUser?.name,
            profileUrl: activeUser?.profileUrl,
            isAdmin: activeUser?.uid === campfire.creator?.uid,
            isModerator: activeUser?.uid === campfire.creator?.uid,
            isSpeaker: activeUser?.uid === campfire.creator?.uid,
          });

          socket.on('send newUsers', (newUsers) => {
            const userId = activeUser?.uid || '';

            const { [userId]: val, ...restUsers } = newUsers;

            const allUsers = [...Object.values(newUsers || {})] as {
              userId: string;
              socketId: string;
            }[];
            const usersList = [...Object.values(restUsers || {})] as {
              userId: string;
              socketId: string;
              emoji: string;
              emojiId: string;
              peerObj: { signal: any };
            }[];

            let newUsersObj = allUsers.reduce((acc: any, curr: any) => {
              acc[curr.userId] = {
                ...curr,
                emoji: '',
                emojiId: '',
              };
              return acc;
            }, {});

            const filtered = usersList.filter(
              (userVal) => userVal.userId !== activeUser?.uid,
            );

            filtered.forEach((filteredItem) => {
              const userDetail = {
                campfireId: activeCampfireId,
                userId: activeUser?.uid || '',
                socketId: socket.id,
                isAdmin: activeUser?.uid === campfire.creator?.uid,
                isModerator: activeUser?.uid === campfire.creator?.uid,
                isSpeaker: activeUser?.uid === campfire.creator?.uid,
                userName: activeUser?.name || '',
                profileUrl: activeUser?.profileUrl,
              };

              const newPeer = createPeer(
                filteredItem.socketId,
                stream,
                userDetail,
                filteredItem.userId,
              );

              if (peersRef.current) {
                peersRef.current = {
                  ...peersRef.current,
                  [filteredItem.userId]: {
                    peer: newPeer,
                  },
                };
              }

              newUsersObj = {
                ...newUsersObj,
                [filteredItem.userId]: {
                  ...newUsersObj[filteredItem.userId],
                  peer: newPeer,
                },
              };
            });
            setPeers((prev: any) => ({
              ...prev,
              ...newUsersObj,
            }));
          });

          socket.on(
            'received new user joined',
            ({ userDetail, peerSignal, memberId }) => {
              if (peersRef.current) {
                if (!peersRef.current[userDetail.userId]) {
                  const peer = addPeer(
                    peerSignal,
                    userDetail.socketId,
                    userDetail.userId,
                    stream,
                    memberId,
                  );
                  peersRef.current = {
                    ...peersRef.current,
                    [userDetail.userId]: {
                      peer,
                    },
                  };
                  setPeers((users: any) => ({
                    ...users,
                    [userDetail.userId]: {
                      ...userDetail,
                      peer,
                    },
                  }));
                }
              }
            },
          );

          socket.on('receiving returned signal', (payload) => {
            if (peersRef.current) {
              const peerItem = peersRef.current[payload.memberId];
              if (peerItem) {
                peerItem.peer.signal(payload.signal);
              }
            }
          });

          socket.on(
            'receiving setUsers',
            ({ setValue, selectedUserId, operation }) => {
              if (operation === 'kick' && selectedUserId === activeUser?.uid) {
                setActiveCampfire(null);
                setActiveCampfireId('');
                setActiveUser(undefined);
                AntdMessage('info', 'You have been kicked from this campfire');
              }
              if (
                operation === 'addModerator' &&
                selectedUserId === activeUser?.uid
              ) {
                // updateMemberRole('moderator');
                AntdMessage(
                  'info',
                  'You have been added as a moderator on this campfire',
                );
              }
              if (
                operation === 'addSpeaker' &&
                selectedUserId === activeUser?.uid
              ) {
                // updateMemberRole('speaker');
                AntdMessage(
                  'info',
                  'You have been added as a speaker on this campfire',
                );
              }
              if (
                operation === 'removeSpeaker' &&
                selectedUserId === activeUser?.uid
              ) {
                // updateMemberRole('audience');
                AntdMessage('info', 'You have been removed as a speaker');
              }
              if (
                operation === 'removeModerator' &&
                selectedUserId === activeUser?.uid
              ) {
                // updateMemberRole('speaker');
                AntdMessage('info', 'You have been removed as a moderator');
              }
              if (operation === 'mute' && selectedUserId === activeUser?.uid) {
                // updateMember({ isMuted: true });
                AntdMessage('info', 'You have been muted.');
              }
              if (
                operation === 'unmute' &&
                selectedUserId === activeUser?.uid
              ) {
                // updateMember({ isMuted: false });
                AntdMessage('info', 'You are now unmuted.');
              }
              setPeers((prev: any) => {
                if (operation === 'kick') {
                  if (peersRef.current) {
                    const userPeer = peersRef.current[selectedUserId];
                    if (userPeer) {
                      userPeer.peer.destroy();
                    }

                    const {
                      [selectedUserId]: val,
                      ...restuserPeers
                    } = peersRef.current;
                    peersRef.current = restuserPeers;
                  }

                  const { [selectedUserId]: kickedPeer, ...restPeers } = prev;
                  return restPeers;
                }
                return {
                  ...prev,
                  [selectedUserId]: {
                    ...prev[selectedUserId],
                    ...setValue,
                  },
                };
              });
            },
          );

          socket.on('receiving raised signal', ({ userId, isRaised }) => {
            setPeers((prev: any) => ({
              ...prev,
              [userId]: {
                ...prev[userId],
                isRaising: isRaised,
              },
            }));
          });

          socket.on(
            'received setEmoji signal',
            ({ setEmojiUserId, emojiDetails }) => {
              setPeers((prev: any) => ({
                ...prev,
                [setEmojiUserId]: {
                  ...prev[setEmojiUserId],
                  ...emojiDetails,
                },
              }));
            },
          );

          socket.on('user leave', (leaveData: any) => {
            if (
              leaveData.userId &&
              leaveData.campfireId &&
              leaveData.campfireId === activeCampfireId
            ) {
              if (peersRef.current) {
                const userPeer = peersRef.current[leaveData.userId];
                if (userPeer) {
                  userPeer.peer.destroy();
                }

                const {
                  [leaveData.userId]: val,
                  ...restuserPeers
                } = peersRef.current;
                peersRef.current = restuserPeers;
              }

              setPeers((prev: any) => {
                const {
                  [leaveData.userId]: disconnectedUser,
                  ...otherUsers
                } = prev;
                return otherUsers;
              });
            }
          });

          socket.on('received end campfire', () => {
            AntdMessage('info', 'Campfire is ended by admin.');
            setPrompt(false);
            setActiveCampfire(null);
            setActiveCampfireId('');
            setActiveUser(undefined);
            setEndedCampfire(true);
          });

          socket.on('connect_error', () => {
            console.log('error socket');
          });
        })
        .catch((err: any) => {
          /* handle the error */
          if (err.message === 'Permission denied') {
            setErrorMsg(
              'Campfire requires access to your microphone so others on the call can hear you.',
            );
          } else {
            setErrorMsg(err.message);
          }
        });
      // eslint-disable-next-line consistent-return
      return () => {
        if (userVideoStream && userVideoStream.srcObject) {
          userVideoStream.srcObject
            .getTracks()
            .forEach((track: any) => track.stop());
        }
        socket.disconnect();
      };
    }
  }, [activeCampfireId, campfire, activeCampfire]);

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    errorMsg && ToastMessage('error', 'Error', errorMsg, 10);
  }, [errorMsg]);

  const clearActiveCampfire = (e: any) => {
    e.preventDefault();
    setActiveCampfire(null);
    setActiveCampfireId('');
    setActiveUser(undefined);
  };

  useEffect(() => {
    window.onbeforeunload = clearActiveCampfire;

    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  const mainLoader = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1000,
    backgroundColor: '#000000d1',
  };

  const handleRejoin = () => {
    setActiveCampfire(activeCampfireId);
  };

  const {
    mutate: acceptPendingMember,
    isLoading: isAcceptMemberLoading,
    isSuccess: isAcceptMemberSuccess,
  } = useMutation(
    (params: { uid: string; id: string; status: string }) =>
      updateMemberStatus(params),
    {
      onSuccess: () => {
        refetchCampfireMembers();
      },
    },
  );

  const {
    mutate: declinePendingMember,
    isLoading: isDeclineMemberLoading,
    isSuccess: isDeclineMemberSuccess,
  } = useMutation(
    (params: { uid: string; id: string }) => deleteMember(params),
    {
      onSuccess: () => {
        refetchCampfireMembers();
      },
    },
  );

  const {
    mutate: endCampfireMutation,
    isLoading: endCampfireLoading,
    isSuccess: endCampfireSuccess,
  } = useMutation((id: string) => deleteCampfire(id));

  const handleEndCampfire = useCallback(
    (id: string) => {
      endCampfireMutation(id, {
        onSuccess: () => {
          filteredPeers.forEach((val) => {
            socket.emit('end campfire', {
              userSocketId: val.socketId,
              campfireId: activeCampfireId,
            });
          });
          navigate('/campfires');
        },
        onError: () => {
          setPrompt(true);
        },
      });
    },
    [activeCampfireId, filteredPeers, socket],
  );

  const handleOnClickPendingMenu = (
    key: 'accept' | 'acceptAll' | 'decline' | 'declineAll',
  ) => {
    const pendingMember = campfireMembers?.filter(
      (val) => val.uid === selectedId,
    );
    if (key === 'accept') {
      acceptPendingMember({
        uid: pendingMember?.[0].uid || '',
        id: activeCampfireId,
        status: 'invited',
      });
    }
    if (key === 'acceptAll') {
      console.log('acceptAll');
    }
    if (key === 'decline') {
      declinePendingMember({
        uid: pendingMember?.[0].uid || '',
        id: activeCampfireId,
      });
    }
    if (key === 'declineAll') {
      console.log('acceptAll');
    }
  };

  const newPeerData = (isModerator: boolean, isSpeaker: boolean) => {
    const newDataPeer = {
      isModerator,
      isSpeaker,
      emoji: '',
      emojiId: '',
    };
    setTimeout(() => {
      setPeers((prev: any) => ({
        ...prev,
        [selectedId]: {
          ...peers[selectedId],
          ...newDataPeer,
        },
      }));
    }, 100);
    return newDataPeer;
  };

  const handleOnClickMenu = (key: string, value: Partial<MemberParams>) => {
    let newPeerVal = {};
    setSelectedId('');
    if (key === 'addModerator') {
      newPeerVal = newPeerData(true, true);
    }
    if (key === 'removeModerator' || key === 'addSpeaker') {
      newPeerVal = newPeerData(false, true);
    }
    if (key === 'removeSpeaker') {
      newPeerVal = newPeerData(false, false);
    }
    if (key === 'kick') {
      setTimeout(() => {
        if (peersRef.current) {
          const userPeer = peersRef.current[selectedId];
          if (userPeer) {
            userPeer.peer.destroy();
          }

          const { [selectedId]: val, ...restuserPeers } = peersRef.current;
          peersRef.current = restuserPeers;
        }

        setPeers((prev: any) => {
          const { [selectedId]: kickedPeer, ...restPeers } = prev;
          return restPeers;
        });
      }, 100);
    }
    if (key === 'mute') {
      setTimeout(() => {
        setPeers((prev: any) => ({
          ...prev,
          [selectedId]: {
            ...peers[selectedId],
            isMuted: true,
          },
        }));
      }, 100);
      newPeerVal = { isMuted: true };
    }
    if (key === 'unmute') {
      setTimeout(() => {
        setPeers((prev: any) => ({
          ...prev,
          [selectedId]: {
            ...peers[selectedId],
            isMuted: false,
          },
        }));
      }, 100);
      newPeerVal = { isMuted: false };
    }

    filteredPeers.forEach((val) => {
      socket.emit('setUsers', {
        campfireId: activeCampfireId,
        setValue: newPeerVal,
        userSocketId: val.socketId,
        selectedUserId: selectedId,
        operation: key,
      });
    });
  };

  const filterInvites =
    activeUser?.uid === campfire?.creator?.uid &&
    campfireMembers &&
    campfireMembers.length > 0
      ? (campfireMembers
          ?.filter((val) => val.status === 'pending')
          .map((value) => ({
            onClickMenu: handleOnClickPendingMenu,
            speaker: value.name,
            onClick: () => ({}),
            uid: value.uid,
            profileUrl: value.profileUrl,
            isActive: false,
            isSpeaker: false,
          })) as MemberItemParams[])
      : [];

  const peersItem = [...Object.values(peers || {})] as {
    isAdmin: boolean;
    isModerator: boolean;
    isSpeaker: boolean;
    profileUrl: string;
    userName: string;
    userId: string;
    isRaising: boolean;
    emoji: string;
    emojiId: string;
    peer?: any;
    isMuted?: boolean;
    peerObj: any;
  }[];

  const speakers = peersItem
    .filter((peer) => peer.isAdmin || peer.isSpeaker)
    .map((value) => ({
      profileUrl: value.profileUrl,
      onClickMenu: (key: any) => handleOnClickMenu(key, value),
      speaker: value.userName,
      onClick: () => ({}),
      isSpeaker: value.isModerator || value.isSpeaker,
      isModerator: value.isModerator,
      isActive: true,
      uid: value.userId,
      isRaising: value.isRaising,
      emoji: value.emoji,
      emojiId: value.emojiId,
      peer: value.userId === activeUser?.uid ? userVideo : value?.peer,
      isLoggedIn: value.userId === activeUser?.uid,
      isMuted: value.isMuted,
    }));

  const members = peersItem
    .filter((peer) => !peer.isAdmin && !peer.isSpeaker)
    .map((value) => ({
      profileUrl: value.profileUrl,
      onClickMenu: (key: string) => handleOnClickMenu(key, value),
      speaker: value.userName,
      onClick: () => ({}),
      isSpeaker: false,
      isActive: false,
      uid: value.userId,
      isRaising: value.isRaising,
      emoji: value.emoji,
      emojiId: value.emojiId,
      peer: value.userId === activeUser?.uid ? userVideo : value?.peer,
      isLoggedIn: value.userId === activeUser?.uid,
      isMuted: value.isMuted,
    }));

  const handleOnClickEmoji = (
    selectedUserId: string,
    type: 'wink' | 'smile' | 'sweat' | 'cool',
  ) => {
    const emojiDetails = {
      emoji: type,
      emojiId: selectedUserId + Math.random().toString(36).substring(2),
    };
    setPeers((prev: any) => ({
      ...prev,
      [selectedUserId]: {
        ...prev[selectedUserId],
        ...emojiDetails,
      },
    }));

    filteredPeers.forEach((val) => {
      socket.emit('send setEmoji', {
        campfireId: activeCampfireId,
        selectedId: selectedUserId,
        emojiDetails,
        userSocketId: val.socketId,
      });
    });
  };

  const handleClickRaiseHand = (userId: string) => {
    setHandRaised((value) => {
      setPeers((prev: any) => ({
        ...prev,
        [userId]: {
          ...prev[userId],
          isRaising: !value,
        },
      }));
      filteredPeers.forEach((val) => {
        socket.emit('send raise signal', {
          campfireId: activeCampfireId,
          userId,
          isRaising: !value,
          userSocketId: val.socketId,
        });
      });
      return !value;
    });
  };

  const handleClickMember = (id: string) => {
    if (
      (activeUser?.uid === campfire?.creator?.uid &&
        id !== campfire?.creator?.uid) ||
      (campfireMember &&
        campfireMember.role === 'moderator' &&
        id !== campfire?.creator?.uid &&
        id !== campfireMember?.uid)
    ) {
      setSelectedId(id);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line no-undef
    // eslint-disable-next-line no-restricted-globals
    const screenWidth = screen.width;
    const size =
      members.length > speakers.length ? members.length : speakers.length;
    switch (breakPoint) {
      case 'xxl':
      case 'xl':
      case 'lg':
        if (size <= 1) {
          setAvatarSize(screenWidth * 0.35);
        } else if (size <= 2) {
          setAvatarSize(screenWidth * 0.3);
        } else if (size <= 3) {
          setAvatarSize(screenWidth * 0.2);
        } else if (size >= 4 && size <= 8) {
          setAvatarSize(screenWidth * 0.2);
        } else if (size >= 9 && size <= 12) {
          setAvatarSize(screenWidth * 0.14);
        } else if (size >= 13 && size <= 28) {
          setAvatarSize(screenWidth * 0.12);
        } else if (size >= 29) {
          setAvatarSize(screenWidth * 0.11);
        }
        break;
      case 'md':
        if (size === 1) {
          setAvatarSize(screenWidth * 0.25);
        } else if (size === 2) {
          setAvatarSize(screenWidth * 0.2);
        } else if (size === 3) {
          setAvatarSize(200);
        } else if (size >= 4 && size <= 8) {
          setAvatarSize(150);
        } else if (size >= 9 && size >= 12) {
          setAvatarSize(120);
        } else if (size >= 13) {
          setAvatarSize(110);
        }
        break;
      case 'sm':
        if (size === 1) {
          setAvatarSize(250);
        } else if (size === 2) {
          setAvatarSize(200);
        } else if (size === 3) {
          setAvatarSize(150);
        } else if (size >= 4 && size <= 8) {
          setAvatarSize(120);
        } else if (size >= 9) {
          setAvatarSize(110);
        }
        break;
      case 'xs':
        if (size === 1) {
          setAvatarSize(200);
        } else if (size <= 2) {
          setAvatarSize(150);
        } else if (size <= 3) {
          setAvatarSize(120);
        } else if (size >= 4) {
          setAvatarSize(110);
        }
        break;
      default:
        setAvatarSize(110);
    }
  }, [speakers, members.length, speakers.length, breakPoint]);

  const handleOnClickProfileMenu = (key: string) => {
    if (key === 'leaveCampfire') {
      navigate('/campfires');
    }
    if (key === 'endCampfire') {
      setEndCampfireModal(true);
    }
  };

  usePrompt('Are you sure you want to leave his campfire?', isPrompt);

  if (isEndedCampfire && !activeCampfire) {
    return (
      <NotSupportedContainer>
        <Result
          status="warning"
          title="Campfire is ended."
          extra={
            <Button
              type="primary"
              key="console"
              onClick={() => navigate('/campfires')}>
              Back to Home
            </Button>
          }
        />
      </NotSupportedContainer>
    );
  }

  if (isInvalidDecryptedValue) {
    return (
      <>
        <Loader />
        <Modal
          title="Error"
          visible
          closable={false}
          footer={[
            <Button key="back" danger onClick={() => navigate(`/campfires`)}>
              Go Back
            </Button>,
          ]}>
          <b>Malformed data. Please provide a valid data value.</b>
        </Modal>
      </>
    );
  }

  if (!isMediaSupported) {
    return (
      <NotSupportedContainer>
        <Result
          status="warning"
          title="Oops. It seems this browser does not support the media API yet. Try using one of this browsers: Chrome, Edge, Firefox, Opera or Safari."
          extra={
            <Button
              type="primary"
              key="console"
              onClick={() => navigate('/campfires')}>
              Back to Home
            </Button>
          }
        />
      </NotSupportedContainer>
    );
  }

  if (!activeCampfire) {
    return (
      <ActiveResult
        onClickHome={() => navigate('/campfires')}
        onClickRejoin={handleRejoin}
        data={campfire}
        error={fetchingCampfireError}
      />
    );
  }

  if (activeCampfire === activeCampfireId) {
    return isFetchingCampfireLoading || endCampfireLoading ? (
      <Loader style={mainLoader} />
    ) : (
      <Layout>
        <TitleContent
          title={campfire?.topic || ''}
          description={campfire?.description || ''}
          onActive
          onClickStartDuration={() => {}}
          campfireId={activeCampfireId || ''}
          scheduleToStart={campfire?.scheduleToStart}
        />
        <ActiveSpeakersWrapper>
          <SpeakersArea
            data={speakers}
            onClick={handleClickMember}
            selectedId={selectedId}
            invites={filterInvites}
            size={avatarSize}
          />
        </ActiveSpeakersWrapper>
        <AudienceWrapper>
          <MembersList
            onClick={handleClickMember}
            selectedId={selectedId}
            data={members}
            size={avatarSize}
          />
        </AudienceWrapper>
        <CampfireFooter
          id={activeUser?.uid || ''}
          profileUrl={activeUser?.profileUrl || ''}
          isMuted={false}
          isRaising={isRaising}
          isSpeaker={false}
          isTalking={false}
          onClickRaiseHand={handleClickRaiseHand}
          onClickMuteMe={() => {}}
          onClickEmoji={handleOnClickEmoji}
          onClickMic={() => {}}
          isAdmin={activeUser?.uid === campfire?.creator?.uid}
          onClickProfileMenu={handleOnClickProfileMenu}
        />
        <Modal
          visible={isEndCampfireModal}
          closable={false}
          footer={[
            <Button onClick={() => setEndCampfireModal(false)}>Cancel</Button>,
            <Button
              danger
              onClick={() => {
                setPrompt(false);
                handleEndCampfire(activeCampfireId);
              }}>
              End Campfire
            </Button>,
          ]}>
          <b>Are you sure you want to end this campfire?</b>
        </Modal>
      </Layout>
    );
  }

  return <></>;
};

export default ActiveTemplate;
