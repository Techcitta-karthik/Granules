import type { ReactNode } from 'react';
import { asset } from './constants';

type PinPanelProps = {
  variant: 'purpose' | 'vision';
  image: string;
  badge: string;
  children: ReactNode;
};

function PinPanel({ variant, image, badge, children }: PinPanelProps) {
  return (
    <div className={`cp-pin-panel cp-pin-panel--${variant}`}>
      <img src={asset(image)} alt="" />
      <div className="cp-pin-overlay" />
      <div className="cp-pin-content">
        <span className="cp-pin-badge">{badge}</span>
        <h3>{children}</h3>
      </div>
    </div>
  );
}

export default function PurposeVisionSection() {
  return (
    <section className="cp-purpose-vision-wrap" aria-label="Our Purpose and Vision">
      <PinPanel variant="purpose" image="purpose-bg.png" badge="Our Purpose">
        Healing lives responsibly through pioneering green science.
      </PinPanel>
      <PinPanel variant="vision" image="vision-bg.png" badge="Our Vision">
        To establish ourselves as a world leader in the green chemical and pharmaceutical industry
        by harnessing cutting-edge technologies to enhance the quality of life.
      </PinPanel>
    </section>
  );
}
