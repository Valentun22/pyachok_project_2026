import {useEffect, useRef, useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks/useReduxHooks';
import {authActions} from '../../redux/slices/authSlice';
import css from './Login.module.css';

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID ?? '';
const FACEBOOK_APP_ID = process.env.REACT_APP_FACEBOOK_APP_ID ?? '';

function loadScript(src: string, id: string): Promise<void> {
    return new Promise((resolve) => {
        if (document.getElementById(id)) {
            resolve();
            return;
        }
        const s = document.createElement('script');
        s.src = src;
        s.id = id;
        s.async = true;
        s.defer = true;
        s.onload = () => resolve();
        document.head.appendChild(s);
    });
}

const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {loading, error} = useAppSelector(state => state.auth);
    const googleBtnRef = useRef<HTMLDivElement>(null);

    const [showPwd, setShowPwd] = useState(false);
    const [form, setForm] = useState({email: '', password: ''});
    const [fieldErrors, setFieldErrors] = useState<{email?: string; password?: string}>({});
    const [oauthLoading, setOauthLoading] = useState<string | null>(null);
    const [googleReady, setGoogleReady] = useState(false);
    const set = (k: string, v: string) => setForm(p => ({...p, [k]: v}));

    const finishOAuth = async (provider: string, token: string) => {
        setOauthLoading(provider);
        const res = await dispatch(authActions.oauthLogin({provider, token}));
        setOauthLoading(null);
        if (authActions.oauthLogin.fulfilled.match(res)) navigate('/');
    };

    useEffect(() => {
        if (!GOOGLE_CLIENT_ID) return;
        loadScript('https://accounts.google.com/gsi/client', 'gsi-script').then(() => {
            window.google?.accounts.id.initialize({
                client_id: GOOGLE_CLIENT_ID,
                callback: (resp: any) => {
                    if (resp.credential) finishOAuth('google', resp.credential);
                },
                scope: 'openid email profile',
            });
            setGoogleReady(true);
        });
    }, []);

    useEffect(() => {
        if (!googleReady || !googleBtnRef.current) return;
        window.google?.accounts.id.renderButton(
            googleBtnRef.current,
            {theme: 'outline', size: 'large', width: 340, text: 'signin_with', locale: 'uk'},
        );
    }, [googleReady]);

    useEffect(() => {
        if (!FACEBOOK_APP_ID) return;
        loadScript('https://connect.facebook.net/uk_UA/sdk.js', 'fb-sdk').then(() => {
            window.FB?.init({
                appId: FACEBOOK_APP_ID, cookie: true, xfbml: false, version: 'v19.0',
            });
        });
    }, []);

    const handleFacebook = () => {
        if (!window.FB) return;
        window.FB.login((response: any) => {
            if (response.authResponse?.accessToken) {
                finishOAuth('facebook', response.authResponse.accessToken);
            }
        }, {scope: 'email,public_profile'});
    };

    const handleSubmit = async () => {
        const errors: {email?: string; password?: string} = {};
        if (!form.email.trim()) errors.email = 'Введіть email';
        else if (!/^[^\s@]+@[^\s@.,]+\.[^\s@.,]{2,}$/.test(form.email)) errors.email = 'Введіть коректний email';
        if (!form.password) errors.password = 'Введіть пароль';
        setFieldErrors(errors);
        if (Object.keys(errors).length > 0) return;

        const deviceId = `web-${Math.random().toString(36).slice(2)}`;
        const res = await dispatch(authActions.login({...form, deviceId}));
        if (authActions.login.fulfilled.match(res)) navigate('/');
        else if (authActions.login.rejected.match(res)) {
            setFieldErrors({password: 'Невірний email або пароль'});
        }
    };

    const showOAuth = !!(GOOGLE_CLIENT_ID || FACEBOOK_APP_ID);

    return (
        <div className={css.page}>
            <div className={css.card}>
                <button className={css.closeBtn} onClick={() => navigate(-1)} aria-label="Закрити">✕</button>
                <h1 className={css.title}>Вхід</h1>
                <p className={css.sub}>Раді бачити тебе знову!</p>

                <div className={css.field}>
                    <label className={css.label}>Email</label>
                    <input className={css.input} type="email" placeholder="your@email.com"
                           value={form.email} onChange={e => {
                        set('email', e.target.value);
                        setFieldErrors(p => ({...p, email: ''}));
                    }}/>
                    {fieldErrors.email && <p className={css.fieldError}>{fieldErrors.email}</p>}
                </div>
                <div className={css.field}>
                    <label className={css.label}>Пароль</label>
                    <div className={css.pwdWrap}>
                        <input className={css.input} type={showPwd ? 'text' : 'password'} placeholder="••••••••"
                               value={form.password} onChange={e => {
                            set('password', e.target.value);
                            setFieldErrors(p => ({...p, password: ''}));
                        }}
                               onKeyDown={e => e.key === 'Enter' && handleSubmit()}/>
                        <button type="button" className={css.eyeBtn} onClick={() => setShowPwd(v => !v)}>
                            {showPwd ? '🙈' : '👁'}
                        </button>
                    </div>
                    {fieldErrors.password && <p className={css.fieldError}>{fieldErrors.password}</p>}
                </div>

                <button className={css.submitBtn} onClick={handleSubmit} disabled={loading}>
                    {loading ? <span className={css.spinner}/> : 'Увійти'}
                </button>

                <p className={css.footer}>
                    Немає акаунту?{' '}
                    <Link to="/register" className={css.link}>Зареєструватись</Link>
                </p>

                {showOAuth && (
                    <>
                        <div className={css.divider}><span>або увійти через</span></div>
                        <div className={css.oauthSection}>
                            {GOOGLE_CLIENT_ID && (
                                <div ref={googleBtnRef} className={css.googleBtnWrap}/>
                            )}
                            {FACEBOOK_APP_ID && (
                                <button
                                    className={css.oauthFacebook}
                                    onClick={handleFacebook}
                                    disabled={oauthLoading === 'facebook'}
                                >
                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="#fff">
                                        <path
                                            d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.12 8.44 9.88V14.89H7.9V12h2.54V9.8c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99C18.34 21.12 22 17 22 12z"/>
                                    </svg>
                                    {oauthLoading === 'facebook' ? 'Завантаження...' : 'Продовжити з Facebook'}
                                </button>
                            )}
                        </div>
                    </>
                )}

                <button className={css.backBtn} onClick={() => navigate(-1)} aria-label="Назад">
                    ← Назад
                </button>
            </div>
        </div>
    );
};

export {Login};