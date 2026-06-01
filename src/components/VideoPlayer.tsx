import styles from './VideoPlayer.module.css';

interface VideoPlayerProps {
  src: string;
  poster: string;
  caption?: string;
  /** True until the MP4 is generated from the .MOV via ffmpeg (see README). */
  pending?: boolean;
}

export function VideoPlayer({ src, poster, caption, pending }: VideoPlayerProps) {
  return (
    <figure className={styles.figure}>
      <div className={styles.frame}>
        <video className={styles.video} controls preload="none" poster={poster} playsInline>
          <source src={src} type="video/mp4" />
          Seu navegador não suporta a reprodução de vídeo.
        </video>
        {pending && (
          <span className={styles.pendingBadge} title="O arquivo MP4 será gerado a partir do .MOV (ver README).">
            Vídeo em processamento
          </span>
        )}
      </div>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
