/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Layout, Row, Col, Spin, Empty, Divider, Grid } from 'antd';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery, useMutation } from 'react-query';

import { theme } from '../../../constants';
import { arrayToObject } from '../../../utils/helpers/common';
import { cipherText, decipherText } from '../../../utils/helpers/crypto';
import { TextInput } from '../../atoms/TextInput';
import { Search } from '../../atoms/Icons';
import { Loader } from '../../atoms/Loader';
import { TitleContent } from '../../molecules/TitleContent';
import { CreateCampfireForm } from '../../organisms/CreateCampfireForm';
import { CampfireTab } from '../../organisms/CampfireTab';
import { TopicCard } from '../../organisms/TopicCard';
import { SponsoredTopicCard } from '../../organisms/SponsoredTopicCard';
import {
  Campfire,
  CampfireParams,
} from '../../../../common/domain/entities/campfire';
import { MemberParams } from '../../../../common/domain/entities/member';

import { useCampfireAction } from '../../../hooks/campfire';
import { useUserState } from '../../../hooks/user';
import { useMemberAction } from '../../../hooks/member';

import {
  SponsoredContainer,
  WrapperTemp,
  SponsonsoredFillerContainer,
} from './elements';

const { useBreakpoint } = Grid;

const TabWrapper = styled.div<{ campfiretoggled: boolean }>`
  margin: 0 40px;
  z-index: ${(props) => (props.campfiretoggled ? '-1;' : 'auto')};
`;

const TitleWrapper = styled.div<{ campfiretoggled: boolean }>`
  z-index: ${(props) => (props.campfiretoggled ? '-1;' : 'auto')};
`;

const SearchIconWrapper = styled.div`
  padding: 14px 14px 14px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TabContentWrapper = styled(Row)`
  padding: 0 2px 64px;
`;

const CardWrapper = styled(Row)`
  padding: 32px 0;
`;

const CreateCampFireWrapper = styled.div`
  margin: -70px 0 24px;
  z-index: 1;
`;

const Cover = styled.div`
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 100%;
`;

const StyledLayout = styled(Layout)<{ campfiretoggled?: boolean }>`
  .campfiretabs: {
    z-index: ${(props) => (props.campfiretoggled ? '-1' : 'auto')};
  }
  background: ${(props) => (props.campfiretoggled ? 'rgb(0 0 0 / 45%)' : '')};
  z-index: 9;
  position: inherit;
`;

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;

  .ant-spin-dot-item {
    background-color: #e75a0b;
  }
`;

const MainTemplate = (): React.ReactElement => {
  const [breakPoint, setBreakPoint] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<string>('publicCampfire');
  const CreateCampfireRef = useRef<any>();
  const screens = useBreakpoint();
  const [searchValue, setSearchValue] = useState('');
  const [isToggled, setCampfireToggled] = useState<boolean>(false);
  const [showInvites, setShowInvites] = useState(false);
  const [privateCampfires, setPrivateCampfires] = useState<{
    [_id: string]: Campfire;
  }>({});
  const [publicCampfires, setPublicCampfires] = useState<{
    [_id: string]: Campfire;
  }>({});
  const [ownedCampfires, setOwnedCampfires] = useState<{
    [_id: string]: Campfire;
  }>({});

  const navigate = useNavigate();

  const {
    fetchOwnedCampfires,
    fetchPublicCampfires,
    fetchPrivateCampfires,
    addCampfire,
    searchCampfires,
  } = useCampfireAction();
  const { addMember } = useMemberAction();
  const { currentUser, isLoading, setActiveCampfire } = useUserState();

  const {
    refetch: refetchOwnedCampfires,
    isFetching: isOwnedCampfiresLoading,
  } = useQuery('campfires', () => fetchOwnedCampfires(currentUser?.id || ''), {
    onSuccess: (res) => {
      if (res && res.length > 0) {
        const filtered = arrayToObject(res);
        setOwnedCampfires(filtered as { [_id: string]: Campfire });
      }
    },
    enabled: false,
  });

  const {
    refetch: refetchPublicCampfires,
    isFetching: isPublicCampfiresLoading,
  } = useQuery(
    `public-campfires`,
    () => fetchPublicCampfires(currentUser?.id || ''),
    {
      onSuccess: (res) => {
        console.log();
        if (res && res.length > 0) {
          const filtered = arrayToObject(res);
          setPublicCampfires(filtered as { [_id: string]: Campfire });
        }
      },
      enabled: false,
      refetchOnMount: 'always',
    },
  );

  const {
    refetch: refetchSearchPublicCampfires,
    isFetching: isSearchPublicCampfiresLoading,
  } = useQuery(
    'search-public-campfires',
    () => searchCampfires(currentUser?.id || '', searchValue, 'public'),
    {
      onSuccess: (res) => {
        if (res) {
          const filtered = arrayToObject(res);
          setPublicCampfires(filtered as { [_id: string]: Campfire });
        }
      },
      enabled: false,
    },
  );

  const {
    refetch: refetchSearchPrivateCamfires,
    isFetching: isSearchPrivateCampfiresLoading,
  } = useQuery(
    'search-private-campfires',
    () => searchCampfires(currentUser?.id || '', searchValue, 'private'),
    {
      onSuccess: (res) => {
        if (res) {
          const filtered = arrayToObject(res);
          setPrivateCampfires(filtered as { [_id: string]: Campfire });
        }
      },
      enabled: false,
    },
  );

  const {
    refetch: refetchSearchOwnedCampfires,
    isFetching: isSearchOwnedCampfiresLoading,
  } = useQuery(
    'search-owned-campfires',
    () => searchCampfires(currentUser?.id || '', searchValue, 'owned'),
    {
      onSuccess: (res) => {
        if (res) {
          const filtered = arrayToObject(res);
          setOwnedCampfires(filtered as { [_id: string]: Campfire });
        }
      },
      enabled: false,
    },
  );

  const {
    refetch: refetchPrivateCampfires,
    isFetching: isPrivateCampfiresLoading,
  } = useQuery(
    'private-campfires',
    () => fetchPrivateCampfires(currentUser?.id || ''),
    {
      onSuccess: (res) => {
        if (res && res.length > 0) {
          const filtered = arrayToObject(res);
          setPrivateCampfires(filtered as { [_id: string]: Campfire });
        }
      },
      enabled: false,
    },
  );

  const {
    mutate: addCampfireMutation,
    isLoading: isAddingCampfire,
    isSuccess: isCampfireAdded,
  } = useMutation((values: CampfireParams) => addCampfire(values));

  const {
    mutate: addMemberMutation,
    isLoading: isAddingMember,
    isSuccess: isMemberAdded,
  } = useMutation((values: { member: MemberParams; id: string }) =>
    addMember(values),
  );

  const {
    mutate: addMemberUpcomingMutation,
    isLoading: isAddingMemberUpcoming,
    isSuccess: isMemberUpcomingAdded,
  } = useMutation((values: { member: MemberParams; id: string }) =>
    addMember(values),
  );

  const handleToggle = useCallback(() => setCampfireToggled(!isToggled), [
    isToggled,
  ]);

  const handleAddCampfire = useCallback(
    (values: CampfireParams) => {
      addCampfireMutation(values, {
        onSuccess: (res: Campfire | undefined) => {
          if (res) {
            setOwnedCampfires({
              ...ownedCampfires,
              [res._id]: {
                ...res,
              },
            });
            setCampfireToggled(false);
          }
        },
        onError: (err) => {
          console.log(err, 'err');
        },
      });
    },
    [ownedCampfires],
  );

  const handleAddMemberMutation = useCallback(
    (values: { member: MemberParams; id: string }) => {
      addMemberMutation(values, {
        onSuccess: (data) => {
          if (activeTab === 'publicCampfire') {
            const userDetail = {
              token: localStorage.getItem('access-token'),
              data: {
                name: currentUser?.name,
                uid: currentUser?.id,
                profileUrl: currentUser?.profileUrl,
                campfireId: data?.campfire,
              },
            };
            setActiveCampfire(data?.campfire || null);
            navigate(
              `/campfires/active/${data?.campfire}?data=${cipherText(
                userDetail,
              )}`,
            );
          }
          if (activeTab === 'privateCampfire') {
            if (data?.campfire) {
              setPrivateCampfires({
                ...privateCampfires,
                [data.campfire]: {
                  ...privateCampfires?.[data.campfire],
                  status: data?.status,
                },
              });
            }
          }
        },
      });
    },
    [activeTab, privateCampfires, publicCampfires, currentUser],
  );

  const handleAddMemberUpcomingMutation = useCallback(
    (values: { member: MemberParams; id: string }) => {
      addMemberUpcomingMutation(values, {
        onSuccess: (data) => {
          if (activeTab === 'publicCampfire') {
            if (data?.campfire) {
              setPublicCampfires({
                ...publicCampfires,
                [data.campfire]: {
                  ...publicCampfires?.[data.campfire],
                  status: data?.status,
                },
              });
            }
          }
          if (activeTab === 'privateCampfire') {
            if (data?.campfire) {
              setPrivateCampfires({
                ...privateCampfires,
                [data.campfire]: {
                  ...privateCampfires?.[data.campfire],
                  status: data?.status,
                },
              });
            }
          }
        },
      });
    },
    [activeTab, privateCampfires, publicCampfires, currentUser],
  );

  const handleOnClick = useCallback(
    (
      campfireId: string,
      status: string,
      type: 'public' | 'private' | 'owned',
      isOwned?: boolean,
      isUpcomingCampfire?: boolean,
    ) => {
      const userDetail = {
        token: localStorage.getItem('access-token'),
        data: {
          name: currentUser?.name,
          uid: currentUser?.id,
          profileUrl: currentUser?.profileUrl,
          campfireId,
        },
      };

      const memberStatus =
        type === 'public' && status === 'uninvited' ? 'invited' : 'pending';
      if (!isUpcomingCampfire) {
        if (isOwned || status === 'invited') {
          setActiveCampfire(campfireId);
          navigate(
            `/campfires/active/${campfireId}?data=${cipherText(userDetail)}`,
          );
        } else {
          handleAddMemberMutation({
            member: {
              profileUrl: currentUser?.profileUrl || '',
              name: currentUser?.name || '',
              uid: currentUser?.id || '',
              campfire: campfireId,
              status: memberStatus,
            },
            id: campfireId,
          });
        }
      } else {
        handleAddMemberUpcomingMutation({
          member: {
            profileUrl: currentUser?.profileUrl || '',
            name: currentUser?.name || '',
            uid: currentUser?.id || '',
            campfire: campfireId,
            status: memberStatus,
          },
          id: campfireId,
        });
      }
    },
    [publicCampfires, currentUser, privateCampfires],
  );

  const handleSubmit = (values: any) => {
    const {
      topic,
      description,
      duration,
      scheduleToStart,
      openTo,
      hidden,
      invited,
    } = values;

    const details = {
      topic,
      description,
      duration,
      scheduleToStart,
      openTo,
      hidden,
      altTopic: topic,
    };

    const creator = {
      uid: currentUser?.id || '',
      profileUrl: currentUser?.profileUrl || '',
      name: currentUser?.name || '',
    };

    const params = {
      ...details,
      creator,
      members: invited,
    };

    handleAddCampfire(params);
  };

  const handleSearchValue = (val: any) => {
    setSearchValue(val);
  };

  const onTabChange = (key: string) => {
    setActiveTab(key);
  };

  const handleClick = (e: any) => {
    if (!CreateCampfireRef?.current?.contains(e.target)) {
      if (!showInvites && !isAddingCampfire) {
        setCampfireToggled(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  });

  useEffect(() => {
    const fooz = Object.entries(screens).filter((screen) => !!screen[1]);
    try {
      setBreakPoint(fooz);
    } catch (err) {
      console.log(err);
    }
  }, [screens]);

  useEffect(() => {
    if (!searchValue && !!currentUser?.id) {
      if (activeTab === 'publicCampfire') {
        refetchPublicCampfires();
      }
      if (activeTab === 'ownedCampfire') {
        refetchOwnedCampfires();
      }
      if (activeTab === 'privateCampfire') {
        refetchPrivateCampfires();
      }
    }
  }, [activeTab, searchValue]);

  let timeout: any;

  useEffect(() => {
    if (searchValue)
      timeout = setTimeout(() => {
        if (activeTab === 'publicCampfire') {
          refetchSearchPublicCampfires();
        } else if (activeTab === 'privateCampfire') {
          refetchSearchPrivateCamfires();
        } else if (activeTab === 'ownedCampfire') {
          refetchSearchOwnedCampfires();
        }
      }, 850);
    return () => clearTimeout(timeout);
  }, [searchValue]);

  const campfiresMock: {
    publicCampfire: { data: Campfire[]; lastId: undefined };
    privateCampfire: { data: Campfire[]; lastId: undefined };
    ownedCampfire: { data: Campfire[]; lastId: undefined };
  } = {
    publicCampfire: {
      data: [...(Object.values(publicCampfires || {}) as Campfire[])],
      lastId: undefined,
    },
    privateCampfire: {
      data: [...(Object.values(privateCampfires || {}) as Campfire[])],
      lastId: undefined,
    },
    ownedCampfire: {
      data: [...(Object.values(ownedCampfires || {}) as Campfire[])],
      lastId: undefined,
    },
  };

  const colSpacingStyle = {
    height: 'fit-content',
  };
  const rowSpacing1Style = { marginLeft: '-2px' };
  const rowSpacing2Style = { paddingTop: 16, marginLeft: '-2px' };

  const renderTopicCards = (
    campfireTopics: Campfire[],
    type: 'public' | 'private' | 'owned',
    isOwnedCampfire?: boolean,
  ) => {
    const today = new Date();

    const startedCampfires = campfireTopics.filter((campfire) => {
      const schedToStart = new Date(campfire.scheduleToStart);
      return today > schedToStart;
    });
    const upcomingCampfires = campfireTopics.filter((campfire) => {
      const schedToStart = new Date(campfire.scheduleToStart);
      return today < schedToStart;
    });

    // TODO: SPONSORED CAMPFIRE UI NEEDS REFACTOR
    const sponsoredCampfire = startedCampfires.filter(
      (campfire) => campfire.isSponsored === true,
    );

    const fillEmptySpacing1: React.ReactElement[] = [];
    const fillEmptySpacing2: React.ReactElement[] = [];
    const index = 0;

    const desc =
      'Lorem Ipsum DolorSunt pariatur id duis sunt deserunt. Irure Lorem nulla non consequat culpa labore magna adipisicing et occaecat enim. Excepteur Lorem minim cillum amet do amet duis elit enim et ullamco proident irure ullamco.Officia aliqua commodo aliquip nostrud esse ex dolor commodo consequat velit. In amet ullamco voluptate magna pariatur tempor ex occaecat ullamco dolor in. Fugiat ipsum dolore cupidatat excepteur sit nulla proident mollit minim occaecat. Lorem eiusmod ex non officia. Eu anim est aute aliquip ipsum veniam aliqua labore fugiat anim mollit ea veniam. Incididunt ad pariatur magna occaecat est ut occaecat culpa duis magna ullamco duis. Commodo cupidatat veniam culpa fugiat proident esse veniam mollit quis reprehenderit sit ex non et.';
    try {
      if (sponsoredCampfire.length > 0 && startedCampfires.length > 0) {
        for (let i = index; i < 2; i++) {
          fillEmptySpacing1.push(
            <Col xs={24} sm={12} md={8} lg={6} style={colSpacingStyle}>
              <TopicCard
                profileURL={startedCampfires[i].creator?.profileUrl || ''}
                title={startedCampfires[i].topic}
                desc={startedCampfires[i].description}
                date={startedCampfires[i].scheduleToStart}
                isStarted={new Date() > startedCampfires[i].scheduleToStart}
                isFeatured
                status={startedCampfires[i].status}
                isLoading={startedCampfires[i]?.isLoading}
                onClick={() =>
                  handleOnClick(
                    startedCampfires[i]._id,
                    startedCampfires[i].status || '',
                    type,
                    isOwnedCampfire,
                  )
                }
                isOwned={isOwnedCampfire}
              />
            </Col>,
          );
        }
        for (let i = 2; i < 4; i++) {
          fillEmptySpacing2.push(
            <Col xs={24} sm={12} md={8} lg={6} style={colSpacingStyle}>
              <TopicCard
                profileURL={startedCampfires[i].creator?.profileUrl || ''}
                title={startedCampfires[i].topic}
                desc={startedCampfires[i].description}
                date={startedCampfires[i].scheduleToStart}
                isStarted={new Date() > startedCampfires[i].scheduleToStart}
                isFeatured
                status={startedCampfires[i].status}
                isLoading={startedCampfires[i]?.isLoading}
                onClick={() =>
                  handleOnClick(
                    startedCampfires[i]._id,
                    startedCampfires[i].status || '',
                    type,
                    isOwnedCampfire,
                  )
                }
                isOwned={isOwnedCampfire}
              />
            </Col>,
          );
        }
      }
    } catch (err) {
      console.log('Error', err);
    }

    const sponsored =
      sponsoredCampfire.length > 0 ? (
        <SponsoredContainer>
          <Col sm={24} md={16} lg={12}>
            <SponsoredTopicCard
              profileURL="https://dummyimage.com/200x200/000/fff"
              title="Biking For Jesus"
              desc={desc}
              // date={new Date('4/12/2021')}
              // isStarted
              // isFeatured
              // status="invited"
              onClick={() => {}}
            />
          </Col>
          <WrapperTemp>
            <SponsonsoredFillerContainer screenSize={breakPoint.length}>
              <Row gutter={[16, 0]} style={rowSpacing1Style}>
                {fillEmptySpacing1}
              </Row>
              <Row gutter={[16, 16]} style={rowSpacing2Style}>
                {fillEmptySpacing2}
              </Row>
            </SponsonsoredFillerContainer>
          </WrapperTemp>
        </SponsoredContainer>
      ) : null;

    const featureCampfires =
      startedCampfires.length > 0
        ? startedCampfires.map((campfire) => (
            <Col xs={24} sm={12} md={8} lg={6}>
              <TopicCard
                profileURL={campfire.creator?.profileUrl || ''}
                totalMembers={campfire.totalMembers}
                title={campfire.topic}
                desc={campfire.description}
                date={campfire.scheduleToStart}
                isStarted={new Date() > new Date(campfire.scheduleToStart)}
                isFeatured
                status={campfire.status}
                isLoading={campfire?.isLoading}
                onClick={() =>
                  handleOnClick(
                    campfire._id,
                    campfire.status || '',
                    type,
                    isOwnedCampfire,
                  )
                }
                isOwned={isOwnedCampfire}
              />
            </Col>
          ))
        : null;

    const upcomingCampfiresCol =
      upcomingCampfires.length > 0
        ? upcomingCampfires.map((campfire) => (
            <Col xs={24} sm={12} md={8} lg={6}>
              <TopicCard
                profileURL={campfire.creator?.profileUrl || ''}
                totalMembers={campfire.totalMembers}
                title={campfire.topic}
                desc={campfire.description}
                date={campfire.scheduleToStart}
                isStarted={new Date() > new Date(campfire.scheduleToStart)}
                isFeatured={false}
                status={campfire.status}
                isLoading={campfire?.isLoading}
                onClick={(isOwned) =>
                  handleOnClick(
                    campfire._id,
                    campfire.status || '',
                    type,
                    isOwned,
                    true,
                  )
                }
                isOwned={isOwnedCampfire}
              />
            </Col>
          ))
        : null;

    const divider =
      upcomingCampfires.length > 0 ? (
        <Col span={24}>
          <Divider style={{ background: theme.colors.gray.grayCE }} />
        </Col>
      ) : null;

    return [sponsored, featureCampfires, divider, upcomingCampfiresCol];
  };

  const { publicCampfire, privateCampfire, ownedCampfire } = campfiresMock;

  const tabs = [
    {
      key: 'publicCampfire',
      title: 'Public Campfires',
      count: publicCampfire.data.length,
      children: (
        <TabContentWrapper>
          <Col xs={24} sm={24} md={16} lg={16} xl={16}>
            <TextInput
              value={searchValue}
              onChange={handleSearchValue}
              placeholder="SEARCH CAMPFIRES ..."
              prefix={
                <SearchIconWrapper>
                  <Search width={22} height={22} />
                </SearchIconWrapper>
              }
              size="middle"
            />
          </Col>
          <Col span={24}>
            <CardWrapper gutter={[16, 16]}>
              {isPublicCampfiresLoading || isSearchPublicCampfiresLoading ? (
                <Col span={24}>
                  <LoaderWrapper>
                    <Spin size="large" />
                  </LoaderWrapper>
                </Col>
              ) : publicCampfire.data.length > 0 ? (
                renderTopicCards(publicCampfire.data, 'public', false)
              ) : (
                <Col span={24}>
                  <LoaderWrapper>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  </LoaderWrapper>
                </Col>
              )}
            </CardWrapper>
          </Col>
        </TabContentWrapper>
      ),
    },
    {
      key: 'privateCampfire',
      title: 'Private Group Campfires',
      count: privateCampfire.data.length,
      children: (
        <TabContentWrapper>
          <Col xs={24} sm={24} md={16} lg={16} xl={16}>
            <TextInput
              value={searchValue}
              onChange={handleSearchValue}
              placeholder="SEARCH CAMPFIRES ..."
              prefix={
                <SearchIconWrapper>
                  <Search width={22} height={22} />
                </SearchIconWrapper>
              }
              size="middle"
            />
          </Col>
          <Col span={24}>
            <CardWrapper gutter={[16, 16]}>
              {isPrivateCampfiresLoading || isSearchPrivateCampfiresLoading ? (
                <Col span={24}>
                  <LoaderWrapper>
                    <Spin size="large" />
                  </LoaderWrapper>
                </Col>
              ) : privateCampfire.data.length > 0 ? (
                renderTopicCards(privateCampfire.data, 'private', false)
              ) : (
                <Col span={24}>
                  <LoaderWrapper>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  </LoaderWrapper>
                </Col>
              )}
            </CardWrapper>
          </Col>
        </TabContentWrapper>
      ),
    },
    {
      key: 'ownedCampfire',
      title: 'My Own Campfires',
      count: ownedCampfire.data.length,
      children: (
        <TabContentWrapper>
          <Col xs={24} sm={24} md={16} lg={16} xl={16}>
            <TextInput
              value={searchValue}
              onChange={handleSearchValue}
              placeholder="SEARCH CAMPFIRES ..."
              prefix={
                <SearchIconWrapper>
                  <Search width={22} height={22} />
                </SearchIconWrapper>
              }
              size="middle"
            />
          </Col>
          <Col span={24}>
            <CardWrapper gutter={[16, 16]}>
              {isOwnedCampfiresLoading || isSearchOwnedCampfiresLoading ? (
                <Col span={24}>
                  <LoaderWrapper>
                    <Spin size="large" />
                  </LoaderWrapper>
                </Col>
              ) : ownedCampfire.data.length > 0 ? (
                renderTopicCards(ownedCampfire.data, 'owned', true)
              ) : (
                <Col span={24}>
                  <LoaderWrapper>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  </LoaderWrapper>
                </Col>
              )}
            </CardWrapper>
          </Col>
        </TabContentWrapper>
      ),
    },
  ];

  const mainLoader = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1000,
    backgroundColor: '#000000a6',
  };

  useEffect(() => {
    setActiveCampfire(null);
  }, []);

  return (
    <StyledLayout campfiretoggled={isToggled}>
      {isLoading && !!currentUser?.id ? (
        <Loader />
      ) : (
        <>
          <TitleWrapper campfiretoggled={isToggled}>
            <TitleContent />
          </TitleWrapper>
          <Cover>
            <Wrapper>
              <CreateCampFireWrapper ref={CreateCampfireRef}>
                <CreateCampfireForm
                  toggle={isToggled}
                  onPress={handleToggle}
                  onSubmit={handleSubmit}
                  onClickShowInvites={setShowInvites}
                  isInviteTagOpen={showInvites}
                  isLoading={isAddingCampfire}
                  // fetchUserList={fetchUserList}
                />
              </CreateCampFireWrapper>
            </Wrapper>
          </Cover>
          <TabWrapper campfiretoggled={isToggled}>
            <CampfireTab tabs={tabs} onChange={onTabChange} />
          </TabWrapper>
        </>
      )}
      {(isAddingMember || isAddingMemberUpcoming) && (
        <Loader style={mainLoader} />
      )}
    </StyledLayout>
  );
};

export default MainTemplate;
