import { gql } from "@apollo/client";

export const COURSE_SUBSCRIPTION = gql`
    subscription subscribeToCourse($campusName: String!) {
        course(campusName: $campusName) {
            name
            prof
            author
        }
    }
`;

export const SEMESTER_SUBSCRIPTION = gql`
    subscription subscribeToSemester($courseName: String!) {
        semester(courseName: $courseName) {
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
`;

export const CHATBOX_SUBSCRIPTION = gql`
    subscription subscribeToChatBox($semesterName: String!) {
        chatbox(semesterName: $semesterName) {
            name
            messages {
                sender
                body
            }
        }
    }
`;


export const MESSAGE_SUBSCRIPTION = gql`
    subscription subscribeToMessage($chatboxName: String!) {
        message(chatboxName: $chatboxName) {
            sender
            body 
        } 
    }
`;