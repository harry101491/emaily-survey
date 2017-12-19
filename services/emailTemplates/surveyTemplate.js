const keys = require("../../config/keys");
module.exports = ({ body }) => {
    return `
    <html>
        <body>
            <div style="text-align: center;">
                <h3> I'd love to hear back from you!!</h3>
                <p>Please! Click on one of the following links and reply the survey</p>
                <p>${body}</p>
                <div>
                    <a href="${keys.redirectDomain}">Yes</a>
                </div>
                <div>
                <a href="${keys.redirectDomain}">No</a>
            </div>
            </div>
        </body>
    </html>
    `;
};