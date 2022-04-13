/* eslint-disable jsx-a11y/alt-text */
import Head from 'next/head';
import React, { useRef, useState } from 'react';
import { FFmpeg, createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import { VideoOutput } from '../../ui/VideoOutput';
import { uploadFileRequest } from '../../../domains/upload/upload.services';
import { getFileNameRequest } from 'domains/operation/operation.services';
import { Button } from '@material-ui/core';

import styles from '../../../styles/Home.module.css';

export const User2Page: React.FC = (props) => {
  const [message, setMessage] = useState<string>('');
  const video = useRef<HTMLVideoElement | null>(null);

  const ffmpeg = useRef<FFmpeg | null>(null);

  const onChange = async () => {
    const name = await getFileNameRequest(() => {
      console.log('loading origin video source');
    }).then();

    if (name.data) transcode(name.data.toString());
  };

  async function transcode(name: string, type?: string, fileName?: string) {
    if (!ffmpeg.current) {
      ffmpeg.current = createFFmpeg({
        corePath: '/ffmpeg-core.js',
        log: true,
      });
    }

    setMessage('Loading ffmpeg-core.js');

    if (!ffmpeg.current.isLoaded()) {
      await ffmpeg.current.load();
    }

    const dot = name.lastIndexOf('.');
    const format = name.substring(dot); // .mp4 / .MOV / .mpg

    ffmpeg.current.FS('writeFile', name, await fetchFile(`/uploads/${name}`));
    setMessage(`Rendering`);

    await ffmpeg.current.run('-ss', '00:00:00.0', '-i', name, '-t', '00:00:03.0', 'origin.mp4'); //demo only
    setMessage('Complete transcoding');

    const data = await ffmpeg.current.FS('readFile', 'origin.mp4');

    if (video.current) {
      video.current.src = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>zonic core</title>
        <meta
          name="description"
          content="Powered by ffmpeg"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>

      <main className={styles.main}>
        <div className={styles.grid}>
          <h1 className={styles.title}>Hello User2</h1>
        </div>
        <div className={styles.grid}>
          <VideoOutput
            video={video}
            message={message}
          />
        </div>
        <div className={styles.card}>
          <div className={styles.button}>
            <Button
              onClick={onChange}
              type="button"
              variant="contained"
            >
              Trim the video
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

User2Page.displayName = 'User2Page';
