import passport from 'passport';
import { Strategy as KakaoStrategy } from 'passport-kakao';
import { User } from '../domains/user/entity/user.entity';
import connectionOptions from '../database/type-orm.config';

module.exports = () => {
  const user = connectionOptions.getRepository(User);
  passport.use(
    new KakaoStrategy(
      {
        clientID: String(process.env.KAKAO_APIKEY),
        callbackURL: String(process.env.CALLBACK_URL),
      },
      async (accessToken: string, refreshToken: string, profile, done) => {
        console.log('kakao profile', profile);

        try {
          const existUser = await user.findOne({ where: { userId: profile.id } });

          if (existUser !== null) {
            done(null, existUser);
          } else {
            const createUser = await user.create({
              email: profile._json && profile._json.kakao_account_email,
              username: profile.displayName,
              userId: profile.id,
            });
            const saveUser = await user.save(createUser);
            done(null, saveUser);
          }
        } catch (error) {
          console.log('kakao login Error : ', error);
          done(error);
        }
      },
    ),
  );
};
