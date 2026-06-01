import { proposals } from '../../data/content';
import { ProposalSection } from '../ProposalSection';
import { Gallery } from '../Gallery';
import { VideoPlayer } from '../VideoPlayer';

const proposal = proposals.find((p) => p.id === 'mais-que-cargos')!;

export function MaisQueCargos() {
  return (
    <ProposalSection proposal={proposal} tone="light">
      {proposal.gallery && (
        <Gallery
          items={proposal.gallery}
          eyebrow="Galeria"
          title={proposal.galleryTitle}
          subtitle={proposal.gallerySubtitle}
          columns={3}
        />
      )}
      {proposal.video && (
        <VideoPlayer
          src={proposal.video.src}
          poster={proposal.video.poster}
          caption={proposal.video.caption}
          pending={proposal.video.pending}
        />
      )}
    </ProposalSection>
  );
}
