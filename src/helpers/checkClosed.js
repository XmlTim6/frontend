export function checkClosed(submission) {
    if (submission.status === "ACCEPTED"
        || submission.status === "REJECTED"
        || submission.status === "AUTHOR_TAKEDOWN") {
        return true;
    }
    return false
}