import styled from '@emotion/styled';
import data from 'data.json';
import Host from '../Contact/Host.tsx';
import RoundButton from '@/components/RoundButton.tsx';
import { Caption, Paragraph } from '@/components/Text.tsx';

const Invitation = () => {
  const { greeting, mapInfo } = data;

  // 2026년 9월 19일 (토) 11:00 ~ 13:00 KST(UTC+9) -> UTC 02:00 ~ 04:00
  const calendarUrl = `https://calendar.google.com/calendar/render?${new URLSearchParams(
    {
      action: 'TEMPLATE',
      text: `${greeting.host.groom.name} ❤ ${greeting.host.bride.name} 결혼식`,
      dates: '20260919T020000Z/20260919T040000Z',
      details: greeting.message,
      location: mapInfo.address1,
    },
  ).toString()}`;

  return (
    <InvitationWrapper>
      <Paragraph>{greeting.message}</Paragraph>
      <Host />
      <Caption textAlign={'center'}>{greeting.eventDetail}</Caption>
      <RoundButton
        target="_blank"
        href={calendarUrl}
        rel="noreferrer">
        구글 캘린더 추가하기
      </RoundButton>
    </InvitationWrapper>
  );
};

export default Invitation;

const InvitationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;
