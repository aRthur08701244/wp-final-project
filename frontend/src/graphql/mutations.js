import { gql } from "@apollo/client";

export const CREATE_CAMPUS_MUTATION = gql`
    mutation createCampus($campusName: String!) {
        createCampus(campusName: $campusName) {
            name
            prof
            author
        }
    }
`

export const CREATE_COURSE_MUTATION = gql`
    mutation createCourse($campusName: String!, $courseName: String!, $profName: String!, $author: String!) {
        createCourse(campusName: $campusName, courseName: $courseName, profName: $profName, author: $author) {
            name
            prof
            semesters {
                name
                chatboxes {
                    name
                    messages {
                        sender
                        body
                    }
                }
            }
        }
    }
`

export const CREATE_SEMESTER_MUTATION = gql`
    mutation createSemester($courseName: String!, $semesterName: String!, $profName: String!) {
        createSemester(courseName: $courseName, semesterName: $semesterName, profName: $profName) {
            name
            chatboxes {
                name
                messages {
                    sender
                    body
                }
            }
        }
    }
`

export const CREATE_CHATBOX_MUTATION = gql`
    mutation createChatBox($courseName: String!, $semesterName: String!, $chatboxName: String!, $profName: String!) {
        createChatBox(courseName: $courseName, semesterName: $semesterName, chatboxName: $chatboxName, profName: $profName) {
            name
            messages {
                sender
                body
            }
        }
    }
`

export const CREATE_MESSAGE_MUTATION = gql`
    mutation createMessage($courseName: String!, $semesterName: String!, $chatboxName: String!, $profName: String!, $sender: String!, $body: String!) {
        createMessage(courseName: $courseName, semesterName: $semesterName, chatboxName: $chatboxName, profName: $profName, sender: $sender, body: $body) {
            sender
            body
        }
    }
`