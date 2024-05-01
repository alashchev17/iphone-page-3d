import React, { useEffect, useRef, useState } from "react";
import { highlightsSlides } from "../constants";
import { pauseImg, playImg, replayImg } from "../utils";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
import { useGSAP } from "@gsap/react";

const VideoCarousel = () => {
  const videoRef = useRef<HTMLVideoElement[]>([]);
  const videoSpanRef = useRef<HTMLSpanElement[]>([]);
  const videoDivRef = useRef<HTMLSpanElement[]>([]);

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const [loadedData, setLoadedData] = useState<
    React.SyntheticEvent<HTMLVideoElement, Event>[]
  >([]);

  const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;

  useGSAP(() => {
    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut",
    });
    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((prev) => ({
          ...prev,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [isEnd, videoId]);

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  useEffect(() => {
    let currentProgress = 0;
    const span = videoSpanRef.current;
    if (span[videoId]) {
      const animation = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress = Math.ceil(animation.progress() * 100);
          if (currentProgress !== progress) {
            currentProgress = progress;
            gsap.to(videoDivRef.current[videoId], {
              width: window.innerWidth < 1200 ? "10vw" : "4vw",
            });
            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: "white",
            });
          }
        },
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: "12px",
            });
            gsap.to(span[videoId], {
              backgroundColor: "transparent",
              width: 0,
            });
          }
        },
      });

      if (videoId === 0) {
        animation.restart();
      }

      const animationUpdate = () => {
        animation.progress(
          videoRef.current[videoId].currentTime /
            highlightsSlides[videoId].videoDuration,
        );
      };

      if (isPlaying) {
        gsap.ticker.add(animationUpdate);
      } else {
        gsap.ticker.remove(animationUpdate);
      }
    }
  }, [videoId, startPlay, isPlaying]);

  const handleProcess = (type: string, i?: number) => {
    switch (type) {
      case "play":
        setVideo((prev) => ({
          ...prev,
          isPlaying: !prev.isPlaying,
        }));
        break;
      case "pause":
        setVideo((prev) => ({
          ...prev,
          isPlaying: !prev.isPlaying,
        }));
        break;
      case "video-end":
        setVideo((prev) => ({
          ...prev,
          isEnd: true,
          videoId: i! + 1,
        }));
        break;
      case "video-last":
        setVideo((prev) => ({
          ...prev,
          isLastVideo: true,
        }));
        break;
      case "video-reset":
        setVideo((prev) => ({
          ...prev,
          isLastVideo: false,
          videoId: 0,
        }));
        break;
      default:
        return video;
    }
  };

  const handleLoadedMetadata = (
    e: React.SyntheticEvent<HTMLVideoElement, Event>,
  ) => setLoadedData((prev) => [...prev, e]);

  return (
    <>
      <div className="flex items-center">
        {highlightsSlides.map((list, i) => (
          <div key={list.id} id="slider" className="sm:pr-20 pr-10">
            <div className="video-carousel_container">
              <div className="w-full h-full rounded-3xl overflow-hidden bg-black flex">
                <video
                  ref={(el) => {
                    if (el) {
                      videoRef.current[i] = el;
                    }
                  }}
                  onPlay={() =>
                    setVideo((prevVideo) => ({
                      ...prevVideo,
                      isPlaying: true,
                    }))
                  }
                  onEnded={() =>
                    i !== 3
                      ? handleProcess("video-end", i)
                      : handleProcess("video-last")
                  }
                  onLoadedMetadata={(e) => handleLoadedMetadata(e)}
                  id="video"
                  className={`
                    ${list.id === 2 && "md:translate-x-44 translate-x-24"} pointer-events-none
                  `}
                  playsInline={true}
                  preload="auto"
                  muted
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>
              <div className={`absolute md:top-12 top-[5%] left-[5%] z-10`}>
                {list.textLists.map((text) => (
                  <p
                    key={text}
                    className="text-white md:text-2xl text-md font-medium"
                  >
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 rounded-full bg-gray-300 backdrop-blur">
          {videoRef.current.map((_, i) => (
            <span
              key={i}
              ref={(el) => {
                if (el) {
                  videoDivRef.current[i] = el;
                }
              }}
              className="mx-2 w-3 h-3 rounded-full bg-gray-200 cursor-pointer relative"
            >
              <span
                className="absolute h-full w-full rounded-full"
                ref={(el) => {
                  if (el) {
                    videoSpanRef.current[i] = el;
                  }
                }}
              ></span>
            </span>
          ))}
        </div>
        <button
          className="control-btn"
          onClick={
            isLastVideo
              ? () => handleProcess("video-reset")
              : !isPlaying
                ? () => handleProcess("play")
                : () => handleProcess("pause")
          }
        >
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={`Icon: ${isLastVideo ? "Replay" : !isPlaying ? "Play" : "Pause"}`}
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
