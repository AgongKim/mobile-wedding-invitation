import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import data from 'data.json';
import { increment, onValue, ref, update } from 'firebase/database';
import { realtimeDb } from '../../firebase.ts';
import JSConfetti from 'js-confetti';
import Heart from '@/assets/icons/heart_plus.svg?react';
import Share from '@/assets/icons/share.svg?react';
import Upward from '@/assets/icons/upward.svg?react';
import Button from '@/components/Button.tsx';

const FloatingBar = ({ isVisible }: { isVisible: boolean }) => {
  const { emojis } = data;

  const [count, setCount] = useState(0);
  const [name, setName] = useState(
    () => `익명${Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, '0')}`,
  );

  useEffect(() => {
    const dbRef = ref(realtimeDb, 'likeCounts');
    onValue(dbRef, (snapshot) => {
      const counts = (snapshot.val() ?? {}) as Record<string, number>;
      const total = Object.values(counts).reduce((sum, n) => sum + Number(n), 0);
      setCount(total);
    });
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).then(
      () => {
        alert('주소가 복사되었습니다.😉😉');
      },
      () => {
        alert('주소 복사에 실패했습니다.🥲🥲');
      },
    );
  };

  const handleCount = () => {
    void jsConfetti.addConfetti({ emojis });

    const trimmedName = name.trim() || '익명';
    // Firebase 키에 사용할 수 없는 문자(. # $ [ ] /)를 치환
    const safeName = trimmedName.replace(/[.#$[\]/]/g, '_');

    void update(ref(realtimeDb), {
      [`likeCounts/${safeName}`]: increment(1),
    });
  };

  const jsConfetti = new JSConfetti();
  const handleScroll = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Nav isVisible={isVisible}>
      <NameInput
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="이름을 입력해주세요"
        maxLength={20}
      />
      <Button onClick={handleCount}>
        <Heart fill="#e88ca6" />
        {count || ''}
      </Button>
      <Button onClick={handleCopy}>
        <Share fill="#e88ca6" />
        공유
      </Button>
      <Button onClick={handleScroll}>
        <Upward fill="#e88ca6" />
        위로
      </Button>
    </Nav>
  );
};

export default FloatingBar;

const Nav = styled.nav<{ isVisible: boolean }>`
  min-width: 280px;
  position: fixed;
  bottom: 30px;
  left: 0;
  right: 0;
  align-items: center;
  justify-content: center;
  gap: 5px;
  display: ${(props) => (props.isVisible ? 'flex' : 'none')};
`;

const NameInput = styled.input`
  width: 100px;
  align-self: stretch;
  box-sizing: border-box;
  padding: 0.5em 0.8em;
  border-radius: 8px;
  border: 1px solid #dfdfdf;
  outline: none;
  box-shadow: none;
  font-family: inherit;
  font-size: 0.9rem;
  line-height: normal;
  background: white;
  color: #1a1a1a;
  text-align: center;

  &::placeholder {
    color: #aaa;
  }
`;
