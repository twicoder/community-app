/* eslint jsx-a11y/no-static-element-interactions:0 */
/**
 * Submissions tab component.
 */

import React from 'react';
import PT from 'prop-types';
import moment from 'moment';
import config from 'utils/config';

import './style.scss';

function renderSubmission(s) {
  return (
    <div styleName="submission" key={s.submissionId}>
      <a target="_blank" href={`${config.URL.STUDIO}?module=DownloadSubmission&sbmid=${s.submissionId}`}>
        <img alt="" src={`${config.URL.STUDIO}/studio.jpg?module=DownloadSubmission&sbmid=${s.submissionId}&sbt=small&sfi=1`} />
      </a>
      <div styleName="bottom-info">
        <div styleName="links">
          <a target="_blank" href={`${config.URL.STUDIO}?module=DownloadSubmission&sbmid=${s.submissionId}`}>{`#${s.submissionId}`}</a>
          <a styleName="handle" target="_blank" href={`${config.URL.BASE}/member-profile/${s.submitter}/design`}>{s.submitter}</a>
        </div>
        <div>{`${moment(s.submissionTime).format('MMM DD,YYYY HH:mm')} EDT`}</div>
      </div>
    </div>
  );
}

export default function Submissions(props) {
  const {
    viewable,
    submissions,
    checkpoints,
    isDesign,
  } = props;
  if (isDesign) {
    return viewable ? (
      <div styleName="container view">
        <div styleName="title">ROUND 2 (FINAL) SUBMISSIONS</div>
        <div styleName="content">
          {
            submissions.map(renderSubmission)
          }
        </div>
        {
          checkpoints.length > 0 &&
            <div styleName="title">ROUND 1 (CHECKPOINT) SUBMISSIONS</div>
        }
        {
          checkpoints.length > 0 &&
            <div styleName="content">
              {
                checkpoints.map(renderSubmission)
              }
            </div>
        }
      </div>
    ) :
      (
        <div styleName="container no-view">
          <div styleName="lock" />
          <div styleName="title">Private Challenge</div>
          <div styleName="subtitle">Submissions are not viewable for this challenge</div>
          <div styleName="desc">There are many reason why the submissions may not be viewable, such
        as the allowance of stock art, or a client&apos;s desire to keep the work private.</div>
        </div>
      );
  }
  /* TODO: Ohh... why the actual <table> was not used here?
   * Should be re-factored to use <table> later. */
  return (
    <div styleName="container dev">
      <div styleName="head">
        <div styleName="col-1">Username</div>
        <div styleName="col-2">Submission Date</div>
        <div styleName="col-3">Initial / Final Score</div>
      </div>
      {
        submissions.map(s => (
          <div key={s.handle + s.submissionDate} styleName="row">
            <div styleName="col-1">
              <a styleName="handle" target="_blank" href={`${config.URL.BASE}/member-profile/${s.handle}/develop`}>{s.handle}</a>
            </div>
            <div styleName="col-2">{moment(s.submissionDate).format('MMM DD, YYYY HH:mm')} EDT</div>
            <div styleName="col-3">
              {s.initialScore.toFixed(2)} / {s.finalScore.toFixed(2)}
            </div>
          </div>
        ))
      }
    </div>
  );
}

Submissions.defaultProps = {
  viewable: false,
  submissions: [],
  checkpoints: [],
  isDesign: false,
};

Submissions.propTypes = {
  viewable: PT.bool,
  submissions: PT.arrayOf(PT.shape()),
  checkpoints: PT.arrayOf(PT.shape()),
  isDesign: PT.bool,
};
