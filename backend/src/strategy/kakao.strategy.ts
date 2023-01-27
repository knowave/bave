import passport from 'passport';
import { Strategy as KakaoStrategy } from 'passport-kakao';
import dotenv from 'dotenv';
import { connectionOptions } from '../database/type-orm.config';
import { User } from '../domains/user/entity/user.entity';

dotenv.config();

const userRepository = connectionOptions.getRepository(User);
module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: String(process.env.KAKAO_APIKEY),
        callbackURL: String(process.env.CALLBACK_URL),
      },
      async (accessToken: string, refreshToken: string, profile, done) => {
        // const socialId = profile.id;
        // const username = profile.displayName;
        // const email = profile.emails[0].value;
        console.log('profile : ', profile);
      },
    ),
  );
};
