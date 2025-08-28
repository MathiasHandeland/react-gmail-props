import '../styles/EmailDetail.css'

function EmailDetail({ email, onBack }) {
    return (
        <div className="email-detail">
            <button className="back-button" onClick={onBack}>Back to inbox</button>
            <h2>{email.title}</h2>
            <div>From: {email.sender}</div>
            <div>{email.body}</div>
        </div>
    )
}

export default EmailDetail