import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { onValue, ref } from 'firebase/database';
import { realtimeDb } from '../../firebase.ts';

interface GuestbookEntry {
  sender: string;
  message: string;
  date: string;
}

const PAGE_SIZE = 5;

const CommentList = () => {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const dbRef = ref(realtimeDb, 'guestbook');
    onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val() as Record<string, GuestbookEntry>;
        const list = Object.values(data).reverse();
        setEntries(list);
      } else {
        setEntries([]);
      }
    });
  }, []);

  if (entries.length === 0) return null;

  const totalPages = Math.ceil(entries.length / PAGE_SIZE);
  const paginated = entries.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <ListWrapper>
      {paginated.map((entry, index) => (
        <EntryItem key={index}>
          <EntryHeader>
            <Sender>{entry.sender}</Sender>
            <Date>{entry.date}</Date>
          </EntryHeader>
          <Message>{entry.message}</Message>
        </EntryItem>
      ))}
      {totalPages > 1 && (
        <Pagination>
          <PageButton onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
            {'<'}
          </PageButton>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <PageButton key={p} onClick={() => setPage(p)} active={p === page}>
              {p}
            </PageButton>
          ))}
          <PageButton onClick={() => setPage((p) => p + 1)} disabled={page === totalPages}>
            {'>'}
          </PageButton>
        </Pagination>
      )}
    </ListWrapper>
  );
};

export default CommentList;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const EntryItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px;
  border-radius: 8px;
  background-color: #fafafa;
  border: 1px solid #f0f0f0;
`;

const EntryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Sender = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 0.75rem;
  font-weight: 200;
  color: #999;
`;

const Message = styled.p`
  font-size: 0.9rem;
  font-weight: 300;
  line-height: 1.5;
  margin: 0;
  white-space: pre-line;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin-top: 4px;
`;

const PageButton = styled.button<{ active?: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid ${({ active }) => (active ? '#e88ca6' : '#ddd')};
  background-color: ${({ active }) => (active ? '#e88ca6' : 'white')};
  color: ${({ active }) => (active ? 'white' : '#666')};
  font-size: 0.8rem;
  font-family: inherit;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    opacity: 0.3;
    cursor: default;
  }
`;
