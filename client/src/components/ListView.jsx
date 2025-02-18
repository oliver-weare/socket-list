/* eslint-disable react/prop-types */
import moment from "moment";
import styled from "styled-components";

import List from "./List";

const BlockSubmissionOverlay = styled.div`
  height: 72vh;
  position: absolute;
  padding: 2em;
  text-align: center;
  top: 2em;
  left: 2em;
  right: 2em;
  z-index: 1;
  background: rgba(214, 214, 214, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;

  @media (min-width: 768px) {
    height: 78vh;
  }
`;

const ListView = ({ lists = [], showBlockSubmissionOverlay }) => {
  return (
    <div className="list-view-container border-top border-bottom mb-4">
      {showBlockSubmissionOverlay && (
        <BlockSubmissionOverlay>
          <div className="card">
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-exclamation-circle-fill mb-2"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2" />
              </svg>
              <p className="lead">This item is already in today&apos;s list.</p>
            </div>
          </div>
        </BlockSubmissionOverlay>
      )}
      {Array.isArray(lists) &&
        lists.map((list) => (
          <List
            key={list._id}
            date={moment(list.date).format("DD-MM-YYYY")}
            items={list.items}
            expired={list.expired}
          />
        ))}
    </div>
  );
};

export default ListView;
