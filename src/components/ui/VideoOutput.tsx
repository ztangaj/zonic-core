import styles from '../../styles/Home.module.css';

export interface IProps {
  video: React.MutableRefObject<HTMLVideoElement | null>;
  message?: string;
}

export const VideoOutput: React.FC<IProps> = (props) => {
  return (
    <div className={styles.media}>
      <video
        ref={props.video}
        width={600}
        height="100%"
        id="output-video"
        controls={true}
      >
        <track
          default={true}
          kind="captions"
          srcLang="en"
        />
      </video>
      <h1>{props.message}</h1>
    </div>
  );
};
