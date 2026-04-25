import {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {messageService} from '../../../services/massage.service';
import {useAppSelector} from '../../../hooks/useReduxHooks';
import {IMessage} from '../../../interfaces/IMessageInterface';
import css from './ChatDialog.module.css';

interface IProps {
    userId: string;
    userName: string;
    userImage?: string;
    onClose: () => void;
}

const ChatDialog = ({userId, userName, userImage, onClose}: IProps) => {
    const navigate = useNavigate();
    const {user} = useAppSelector(s => s.auth);
    const myId = (user as any)?.id;
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [text, setText] = useState('');
    const [sending, setSending] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    const load = async () => {
        try {
            const {data} = await messageService.getDialog(userId);
            setMessages(data.data ?? []);
        } catch {}
        setLoading(false);
    };

    useEffect(() => {
        load();
        const interval = setInterval(load, 5000);
        return () => clearInterval(interval);
    }, [userId]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [messages]);

    const handleSend = async () => {
        if (!text.trim() || sending) return;
        setSending(true);
        try {
            const {data} = await messageService.send(userId, text.trim());
            setMessages(p => [...p, data]);
            setText('');
        } catch {}
        setSending(false);
    };

    const formatTime = (d: string) =>
        new Date(d).toLocaleString('uk-UA', {day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'});

    return (
        <div className={css.overlay} onClick={onClose}>
            <div className={css.dialog} onClick={e => e.stopPropagation()}>
                <div className={css.dialogHeader}>
                    <div className={css.dialogUser} onClick={() => navigate(`/users/${userId}`)}>
                        {userImage
                            ? <img src={userImage} alt="" className={css.avatar}/>
                            : <div className={css.avatarPlaceholder}>{userName[0]?.toUpperCase()}</div>
                        }
                        <span className={css.userName}>{userName}</span>
                    </div>
                    <button className={css.closeBtn} onClick={onClose}>✕</button>
                </div>

                <div className={css.messages}>
                    {loading && <div className={css.loading}>Завантаження...</div>}
                    {!loading && messages.length === 0 && (
                        <div className={css.empty}>Почніть розмову!</div>
                    )}
                    {messages.map(msg => {
                        const isMe = msg.sender?.id === myId;
                        return (
                            <div key={msg.id} className={`${css.bubble} ${isMe ? css.bubbleMe : css.bubbleThem}`}>
                                <p className={css.bubbleText}>{msg.text}</p>
                                <span className={css.bubbleTime}>{formatTime(msg.created)}</span>
                            </div>
                        );
                    })}
                    <div ref={bottomRef}/>
                </div>

                <div className={css.inputRow}>
                    <textarea
                        className={css.input}
                        placeholder="Написати повідомлення..."
                        value={text}
                        onChange={e => setText(e.target.value)}
                        onKeyDown={e => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                        rows={2}
                    />
                    <button className={css.sendBtn} onClick={handleSend} disabled={!text.trim() || sending}>
                        {sending ? '...' : '➤'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export {ChatDialog};