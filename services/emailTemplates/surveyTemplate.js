module.exports = ({ body }) => {
    return `
    <html>
        <body>
            <div style="text-align: center;">
                <h3> I'd love to hear back from you!!</h3>
                <p>Please! Click on one of the following links and reply the survey</p>
                <p>${body}</p>
                <div>
                    <a href="http://localhost:3000">Yes</a>
                </div>
                <div>
                <a href="http://localhost:3000">No</a>
            </div>
            </div>
        </body>
    </html>
    `;
};