import styled from '@emotion/styled';

export const Heading1 = styled.p`
  font-family: 'NanumSeAh', serif;
  font-size: 2.3rem;
  margin: 10px;
  color: #e88ca6;
  white-space: pre-line;
  /* 단일 굵기 손글씨체라 획을 두껍게 해 무게감을 줌 */
  -webkit-text-stroke: 0.8px currentColor;
`;

export const Heading2 = styled.p`
  font-size: 1rem;
  margin: 10px;
  white-space: pre-line;
`;

export const PointTitle = styled.p`
  font-family: 'NanumSeAh', serif;
  font-size: 1.4rem;
  line-height: 1;
  margin: 0;
  color: #e88ca6;
  white-space: pre-line;
  /* 단일 굵기 손글씨체라 획을 두껍게 해 무게감을 줌 */
  -webkit-text-stroke: 0.8px currentColor;
`;

export const Paragraph = styled.p`
  line-height: 2.2rem;
  white-space: pre-line;
`;

export const Caption = styled.p<{ textAlign?: string }>`
  font-weight: 200;
  text-align: ${(props) => (props.textAlign ? props.textAlign : 'start')};
  white-space: pre-line;
`;
