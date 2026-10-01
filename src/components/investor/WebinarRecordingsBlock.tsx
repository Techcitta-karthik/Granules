import React, { useState } from 'react';
import './webinar-recordings.css';

export interface WebinarItem {
  type: 'audio' | 'video';
  title: string;
  date: string;
  fileUrl: string;
  downloadName: string;
}

const WEBINAR_ITEMS: WebinarItem[] = [
  {
    type: 'audio',
    title: 'Audio Recording of the Webinar held on September 29,2026',
    date: 'September 29, 2026',
    fileUrl: '/documents/recordings/GMT20260929-110141_Recording.m4a',
    downloadName: 'Granules_Webinar_Audio_2026-09-29.m4a'
  },
  {
    type: 'video',
    title: 'Video Recording of the Webinar held on September 29,2026',
    date: 'September 29, 2026',
    fileUrl: '/documents/recordings/GMT20260929110141-Vrecording.mp4',
    downloadName: 'Granules_Webinar_Video_2026-09-29.mp4'
  }
];

export default function WebinarRecordingsBlock() {
  const [activeMedia, setActiveMedia] = useState<WebinarItem | null>(null);

  const handleClose = () => {
    setActiveMedia(null);
  };

  return (
    <div className="webinar-recordings-container" aria-label="Webinar Recordings">
      <div className="webinar-buttons-stack">
        {WEBINAR_ITEMS.map((item, idx) => (
          <button
            key={idx}
            type="button"
            className="webinar-record-btn"
            onClick={() => setActiveMedia(item)}
            aria-label={`Play ${item.title}`}
          >
            <span className="webinar-btn-text">{item.title}</span>
            <span className="webinar-play-icon-wrap" aria-hidden="true">
              <svg
                className="webinar-play-icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
                <polygon points="10,8 16,12 10,16" fill="currentColor" />
              </svg>
            </span>
          </button>
        ))}
      </div>

      {/* Media Player Modal / Lightbox */}
      {activeMedia && (
        <div
          className="webinar-modal-backdrop"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-label={activeMedia.title}
        >
          <div
            className="webinar-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="webinar-modal-header">
              <div className="webinar-modal-badge">
                {activeMedia.type === 'audio' ? '🎧 Audio Recording' : '🎬 Video Recording'}
              </div>
              <button
                type="button"
                className="webinar-modal-close"
                onClick={handleClose}
                aria-label="Close media player"
              >
                ✕
              </button>
            </div>

            <h3 className="webinar-modal-title">{activeMedia.title}</h3>
            <p className="webinar-modal-subtitle">
              Granules India Investor Webinar • {activeMedia.date}
            </p>

            <div className="webinar-player-wrapper">
              {activeMedia.type === 'video' ? (
                <video
                  className="webinar-video-player"
                  controls
                  autoPlay
                  playsInline
                  src={activeMedia.fileUrl}
                >
                  Your browser does not support HTML5 video playback.
                </video>
              ) : (
                <div className="webinar-audio-player-box">
                  <div className="webinar-audio-wave-anim">
                    <span className="wave-bar"></span>
                    <span className="wave-bar"></span>
                    <span className="wave-bar"></span>
                    <span className="wave-bar"></span>
                    <span className="wave-bar"></span>
                  </div>
                  <audio
                    className="webinar-audio-player"
                    controls
                    autoPlay
                    src={activeMedia.fileUrl}
                  >
                    Your browser does not support HTML5 audio playback.
                  </audio>
                </div>
              )}
            </div>

            <div className="webinar-modal-footer">
              <a
                href={activeMedia.fileUrl}
                download={activeMedia.downloadName}
                className="webinar-download-btn"
                title={`Download ${activeMedia.title}`}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Download File</span>
              </a>

              <a
                href={activeMedia.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="webinar-external-btn"
                title="Open in new window"
              >
                <span>Open in Tab</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
