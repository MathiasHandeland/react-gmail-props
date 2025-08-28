import '../styles/Email.css'

function Email ({ email, onToggleRead, onToggleStar, onOpenEmail }) {
    return (
       <li className={`email ${email.read ? 'read' : 'unread'}`}
       onClick={() => onOpenEmail(email)}
       >
        <div className="select">
            <input
                className="select-checkbox"
                type="checkbox"
                checked={email.read}
                onClick={(e) => {e.stopPropagation() }}
                onChange={() => onToggleRead(email)}
            />
        </div>
        <div className="star">
            <input
                className="star-checkbox"
                type="checkbox"
                checked={email.starred}
                onClick={(e) => e.stopPropagation()}   
                onChange={() => onToggleStar(email)}
            />
        </div>
        <div className="sender">{email.sender}</div>
        <div className="title">{email.title}</div>
    </li>
    )
}

export default Email