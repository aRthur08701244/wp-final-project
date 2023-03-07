import { gql } from "@apollo/client";

export const CAMPUS_QUERY = gql`
    query campus($campusName: String!) {
        campus(campusName: $campusName) {
            name
            prof
            author
        }
    }
`;

export const COURSE_QUERY = gql`
    query course($campusName: String!, $courseName: String!, $profName: String!) {
        course(campusName: $campusName, courseName: $courseName, profName: $profName) {
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
`;