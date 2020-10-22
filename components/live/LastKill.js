import React, { useState, useEffect } from 'react';
import useTranslation from 'next-translate/useTranslation';

function LastKill(props) {
  const {
    killer, killed, distance, weapon, date,
  } = props;
  const timestampDefault = Math.round((new Date() - new Date(date)) / 1000);
  const [timeStamp, setTimeStamp] = useState(timestampDefault);
  const minutes = (timeStamp >= 60) ? Math.floor(timeStamp / 60) : 0;
  const seconds = (timeStamp <= 0) ? 0 : timeStamp % 60;
  const timeString = `${minutes > 0 ? `${minutes}min ` : ''}${seconds}s`;
  useEffect(() => {
    const interval = setInterval(() => setTimeStamp((ts) => ts + 1), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const { t } = useTranslation();

  return (
    <div className="card bg-darker my-2 text-center shadow">
      <div className="container">
        <div className="row">
          <div className="col-sm-4 d-flex align-items-center justify-content-center">
            <div className="hide-overflow">
              <div style={{ fontFamily: '"Montserrat", sans-serif' }}>{killer}</div>
              <small className="d-none d-sm-block mt-2">
                <i className="fa fa-clock" />
                {t('live:lastKills.time', { timeString })}
              </small>
            </div>
          </div>
          <div className="col-sm-4 d-flex align-items-center justify-content-center">
            <div className="hide-overflow">
              <div
                className="text-primary py-2 py-sm-0"
                style={{
                  fontFamily: 'Montserrat, sans-serif', fontWeight: '600', fontSize: 29, lineHeight: 1.2,
                }}
              >
                {t('live:lastKills.killed')}
              </div>
              <small className="d-none d-sm-block mt-2">
                <i className="fa fa-people-arrows" />
                {t('live:lastKills.distance', { distance })}
              </small>
            </div>
          </div>
          <div className="col-sm-4 d-flex align-items-center justify-content-center">
            <div className="hide-overflow">
              <div style={{ fontFamily: '"Montserrat", sans-serif' }}>{killed}</div>
              <small className="d-none d-sm-block mt-2">
                <i className="fa fa-skull-crossbones" />
                {t('live:lastKills.weapon', { weapon })}
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LastKill;
