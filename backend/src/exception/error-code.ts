export const BEACH_EXCEPTION = {
  NOT_FOUND_BEACHES: {
    code: 'NOT_FOUND_BEACHES',
    message: '전체 해수욕장이 존재하지 않습니다.',
  },
  NOT_FOUND_BEACH: {
    code: 'NOT_FOUND_BEACH',
    message: '존재하는 해수욕장이 없습니다.',
  },
};

export const USER_EXCEPTION = {
  EXIST_USER: {
    code: 'EXIST_USER',
    message: '이미 존재하는 유저입니다.',
  },
  EXIST_USERNAME: {
    code: 'EXIST_USERNAME',
    message: '이미 존재하는 닉네임입니다.',
  },
  NOT_FOUND_USER: {
    code: 'NOT_FOUND_USER',
    message: '존재하는 유저가 없습니다.',
  },
  NOT_MATCH_PASSWORD: {
    code: 'NOT_MATCH_PASSWORD',
    message: '비밀번호가 일치하지 않습니다.',
  },
};

export const FEED_EXCEPTION = {
  NOT_FOUND_FEED: {
    code: 'NOT_FOUND_FEED',
    message: '피드를 찾을 수 없습니다.',
  },
};
