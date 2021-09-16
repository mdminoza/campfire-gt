import React from 'react';
import { Row, Empty } from 'antd';

import { MemberItem } from '../../molecules/MemberItem';
import { AnimatedEmoji } from '../../molecules/AnimatedEmoji';
import { MemberItemParams } from '../../molecules/MemberItem/types';

import { Container, ItemWrapper, ItemCol, NoMemberWrapper } from './elements';

type Props = {
  data: Array<MemberItemParams>;
  onClick: (id: string) => void;
  selectedId: string;
  size?: number;
};

const MembersList = ({ data, selectedId, onClick, size }: Props) => (
  <Container>
    <Row gutter={[24, 32]} justify="center">
      {data && data.length > 0 ? (
        data.map((_data: MemberItemParams) => (
          <ItemCol>
            <ItemWrapper>
              <AnimatedEmoji
                isAudience
                emoji={_data.emoji || ''}
                emojiId={_data.emojiId || ''}
              />
              <MemberItem
                id={_data.uid}
                selectedId={selectedId}
                profileUrl={_data.profileUrl}
                onClickMenu={_data.onClickMenu}
                speaker={_data.speaker}
                onClick={onClick}
                isSpeaker={_data.isSpeaker}
                isActive={_data.isActive}
                isRaising={_data.isRaising}
                peer={_data?.peer}
                isLoggedIn={_data?.isLoggedIn}
                isMuted={_data?.isMuted}
                size={size}
              />
            </ItemWrapper>
          </ItemCol>
        ))
      ) : (
        <NoMemberWrapper>
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No attendees yet"
          />
        </NoMemberWrapper>
      )}
    </Row>
  </Container>
);

export default MembersList;
