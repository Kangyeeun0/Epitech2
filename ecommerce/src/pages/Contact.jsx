import './contact.css';

export default function Contact() {
    return (
        <>
            <div className="contact-total">
                <h1 style={{ fontWeight: 'bold', marginBottom: '50px', fontSize: '40px' }}>CONTACT</h1>
                <div className="contact-content">
                    <p style={{ textAlign: 'center', fontSize: '23px' }}>
                        If you have any questions about our products or our team,
                        <br /> please don’t hesitate to contact us via email.
                        <br /> We’d be happy to assist you.
                    </p>
                    <a className="contact-email-text" href="https://mail.google.com/mail/u/0/#inbox?compose=new">
                        kangyeeun55@gmail.com
                    </a>

                    <a className="contact-email-text" href="https://mail.google.com/mail/u/0/#inbox?compose=new">
                        elena111zhang@gmail.com
                    </a>
                </div>
            </div>
        </>
    );
}
