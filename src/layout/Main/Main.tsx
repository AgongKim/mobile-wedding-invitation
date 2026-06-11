import styled from '@emotion/styled';
import mainImg from '@/assets/images/00129.jpg';

const Main = () => {
  return (
    <Hero>
      <Announcement>
        <CoupleName>Taehyun &amp; Doyeon</CoupleName>
        <Subtitle>| WE ARE GETTING MARRIED |</Subtitle>
        <EventInfo>
          <b>2026. 09. 19. SAT AM 11:00</b>
          <br />
          더시그너스 웨딩 수원 컨벤션홀
        </EventInfo>
      </Announcement>
    </Hero>
  );
};

export default Main;

const Hero = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 60px;
  box-sizing: border-box;
  width: calc(100% + 60px);
  height: 100vh;
  min-height: 480px;
  margin: -30px -30px 0;
  background:
    linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    url(${mainImg}) no-repeat center center;
  background-size: cover;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-color: rgba(245, 138, 119, 0.2);
  }
`;

const Announcement = styled.div`
  position: relative;
  z-index: 1;
  max-width: 600px;
  padding: 0 20px;
  text-align: center;
  color: #fff;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.4);
  letter-spacing: 2px;
`;

const CoupleName = styled.p`
  font-family: 'Great Vibes', cursive;
  font-size: 70px;
  margin: 0;

  @media (max-width: 576px) {
    font-size: 50px;
  }
`;

const Subtitle = styled.p`
  font-family: 'Gugi', cursive;
  font-size: 1rem;
  margin: 2rem 0 0;
`;

const EventInfo = styled.p`
  font-family: 'Noto Serif KR', serif;
  font-size: 1rem;
  letter-spacing: -1px;
  margin: 2rem 0 0;
  line-height: 1.6;

  b {
    font-size: 1.4em;
  }
`;
