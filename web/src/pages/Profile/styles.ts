import { shade } from 'polished';
import styled from 'styled-components';

export const AvatarInput = styled.div`
  margin: 0 auto 32px;
  width: 186px;
  position: relative;

  img {
    height: 186px;
    width: 186px;
    border-radius: 50%;
  }

  button {
    position: absolute;
    bottom: 0;
    right: 0;
    height: 48px;
    width: 48px;
    border: 0;
    border-radius: 50%;
    background-color: #ff9000;
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: ${shade(0.2, '#ff9000')};
    }

    svg {
      color: #312e38;
      height: 20px;
      width: 20px;
    }
  }
`;

export const Container = styled.div`
  min-height: 100vh;

  > header {
    height: 144px;
    background-color: #28262e;

    div {
      height: 100%;
      max-width: 1120px;
      margin: 0 auto;

      display: flex;
      align-items: center;
      justify-content: flex-start;

      a {
        padding: 12px;

        svg {
          color: #999591;
          width: 24px;
          height: 24px;
        }
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: -176px auto 0;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      color: #f4ede8;
      margin-bottom: 24px;
      font-size: 20px;
      text-align: left;
    }

    hr {
      margin: 8px;
      border: 0;
    }
  }
`;
