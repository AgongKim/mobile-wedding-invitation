import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { onValue, ref } from 'firebase/database';
import { realtimeDb } from '../../firebase.ts';
import Crown from '@/assets/icons/crown.svg?react';

interface RankItem {
  name: string;
  count: number;
}

// 금 / 은 / 동 왕관 색상
const CROWN_COLORS = ['#f5c518', '#b8b8b8', '#cd7f32'];

const LikeRanking = () => {
  const [ranking, setRanking] = useState<RankItem[]>([]);

  useEffect(() => {
    const dbRef = ref(realtimeDb, 'likeCounts');
    onValue(dbRef, (snapshot) => {
      const counts = (snapshot.val() ?? {}) as Record<string, number>;
      const list = Object.entries(counts)
        .map(([name, count]) => ({ name, count: Number(count) }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);
      setRanking(list);
    });
  }, []);

  if (ranking.length === 0) return null;

  return (
    <RankWrapper>
      {ranking.map((item, index) => (
        <RankItemRow key={item.name}>
          <Rank>
            {index < 3 ? (
              <Crown style={{ color: CROWN_COLORS[index], width: 22, height: 22 }} />
            ) : (
              `${index + 1}위`
            )}
          </Rank>
          <Name>{item.name}</Name>
          <Count>❤️ {item.count}</Count>
        </RankItemRow>
      ))}
    </RankWrapper>
  );
};

export default LikeRanking;

const RankWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 90%;
  margin-bottom: 80px;
`;

const RankItemRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 8px;
  background-color: #fafafa;
  border: 1px solid #f0f0f0;
`;

const Rank = styled.span`
  font-size: 1rem;
  min-width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Name = styled.span`
  flex: 1;
  font-size: 0.9rem;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Count = styled.span`
  font-size: 0.85rem;
  font-weight: 300;
  color: #e88ca6;
`;
