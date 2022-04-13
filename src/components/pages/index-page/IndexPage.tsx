/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import Head from 'next/head';
import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Routes } from '../../../constants/Routes';
import { FFmpeg, createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import { UiFileInputButton } from '../../ui/ui-file-input-button/UiFileInputButton';
import { VideoOutput } from '../../ui/VideoOutput';
import { uploadFileRequest } from '../../../domains/upload/upload.services';
import { getFileNameRequest, updateFileNameRequest } from 'domains/operation/operation.services';
import { Button } from '@material-ui/core';

import styles from '../../../styles/Home.module.css';

export const IndexPage: React.FC = (props) => {
  const [message, setMessage] = useState<string>('');
  const [videoName, setVideoName] = useState<string>('');
  const video = useRef<HTMLVideoElement | null>(null);

  const ffmpeg = useRef<FFmpeg | null>(null);

  const onChange = async (formData: FormData) => {
    const response = await uploadFileRequest(formData, (event) => {
      console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
    });

    console.log('response', response);
  };

  async function transcode(name: string, type?: string) {
    if (!ffmpeg.current) {
      ffmpeg.current = createFFmpeg({
        corePath: '/ffmpeg-core.js',
        log: true,
      });
    }

    setMessage('Loading ffmpeg-core.js');
    setVideoName(name);
    await updateFileNameRequest(name, (event) => {
      console.log(`file name is ${name}`);
    });

    if (!ffmpeg.current.isLoaded()) {
      await ffmpeg.current.load();
    }

    ffmpeg.current.FS('writeFile', name, await fetchFile(`/uploads/${name}`));
    setMessage(`Transcoding, original type: ${type}`);

    if (type !== 'video/mp4') {
      await ffmpeg.current.run('-i', name, 'origin.mp4');
    } else {
      ffmpeg.current.FS('writeFile', 'origin.mp4', await fetchFile(`/uploads/${name}`));
    }
    setMessage('Complete transcoding');

    const data = ffmpeg.current.FS('readFile', 'origin.mp4');

    // let videoObject = document.createElement('input');
    // let videoList = new DataTransfer();
    // let videoFile = new FileList();

    const formData = new FormData();

    if (video.current) {
      video.current.src = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));

      const outputBlob = new Blob([data.buffer], { type: 'video/mp4' });

      // const outputFile = new File([outputBlob], 'name');

      // videoList.items.add(outputFile);
      // videoFile = videoList.files;

      formData.append('theFile', outputBlob);
      // videoObject.setAttribute('download', 'origin.mp4');
    }

    const response = await uploadFileRequest(formData, (event) => {
      console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
    });

    console.log('response', response);
  }

  const onClick = async () => {
    const name = await getFileNameRequest(() => {
      console.log('loading origin video source');
    }).then();

    if (name.data) merge(name.data.toString());
  };

  async function merge(name: string, type?: string, fileName?: string) {
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

    await ffmpeg.current.run('-ss', '00:00:00.0', '-i', name, '-t', '00:00:03.0', '-an', 'origin.mp4'); //demo only
    setMessage('Complete transcoding');

    const data = await ffmpeg.current.FS('readFile', 'origin.mp4');

    if (video.current) {
      video.current.src = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
    }
  }

  // useEffect(() => {
  //   (async function asyncFunction() {
  //     const name = await getFileNameRequest(() => {
  //       console.log('loading origin video source');
  //     }).then();

  //     if (name.data) transcode(name.data.toString());
  //   })();
  // }, []);

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
          <h1 className={styles.title}>Welcome to</h1>
          <span className={styles.logo}>
            <Image
              src="/zonic.svg"
              width={200}
              height={100}
            />
          </span>
        </div>
        <div className={styles.grid}>
          <div className={styles.button}>
            <UiFileInputButton
              label="Upload Single File"
              uploadFileName="theFiles"
              onChange={onChange}
              transcode={transcode}
            />
          </div>
          <div className={styles.button}>
            <Button
              onClick={onClick}
              type="button"
              variant="contained"
            >
              Merge Current Change and render
            </Button>
          </div>
        </div>

        <div className={styles.grid}>
          <VideoOutput
            video={video}
            message={message}
          />
          <a
            href={Routes.User1}
            className={styles.card}
          >
            <h2>User 1</h2>
            <p>Will remove the audio of this video.</p>
          </a>

          <a
            href={Routes.User2}
            className={styles.card}
          >
            <h2>User 2</h2>
            <p>Will trim this video into the first 3 seconds!</p>
          </a>
        </div>
      </main>
    </div>
  );
};

IndexPage.displayName = 'IndexPage';
