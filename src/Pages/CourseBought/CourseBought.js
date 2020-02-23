import React, {useEffect, useRef, useState} from 'react';
import './CourseBought.css';

import {user} from '../../store/actions';

import {stringify} from 'query-string';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import axios, {baseURL} from '../../axios';
import {Link} from 'react-router-dom';

import playUrl from '../../assets/play.svg';
import finished from '../../assets/finished.svg';
import notFinished from '../../assets/notFinished.svg';

import Video from 'react-player';
import Loader from '../../UI/Loader/Loader';
import CommentModal from './CommentModal/CommentModal';

// COUNTER
let counter = 0;
let updatedU;
const time = 1000;
let HTTP_Timer = setTimeout(() => {}, time);

const CourseBought = ({user, history, setNewUser}) => {
    const [course, setCourse] = useState(null);
    const [active, setActive] = useState(null);

    const [playing, setPlaying] = useState(false);
    const [loader, setLoader] = useState(false);
    const [err, setErr] = useState(null);

    // REFERENCES
    const descRef = useRef(null);
    const activeVideoRef = useRef(null);
    const modalOpenerRef = useRef(null);
    const modalCloserRef = useRef(null);

    useEffect(() => {
        let cancel = false;
        if(!cancel && user) {
            const id = history.location.pathname.split('/course/')[1];
            setLoader(true);
            setPlaying(false);
            axios(`course/${id}`)
                .then(res => {
                    const c = {
                        ...res.data.data,
                        videos: res.data.data.videos.map(vd => {
                            let extras = {
                                finished: false
                            }
                            if(user) {
                                extras = user.extras.find(fv => fv._id === vd._id);
                            }
                            return {
                                ...vd,
                                ...extras
                            }
                        })
                    };
    
                    let activeVideo = {
                        ...c.videos[0], 
                        videoId: c.videos[0]._id,
                        currentTime: 0
                    };
                    if(user.activeVideos.length > 0){
                        const AV = user.activeVideos.find(vd => vd.courseId === c._id);
                        if(AV) {
                            activeVideo = {
                                ...c.videos.find(vd => vd._id === AV.videoId),
                                ...AV,
                                _id: AV.videoId
                            }
                        }
                    }
                    setActive({
                        ...activeVideo,
                        path: `${baseURL}video/?${stringify({path:JSON.stringify(activeVideo.videoUrl)})}`
                    });
                    setCourse(c);
                    setErr(null);
                    setLoader(false);
                    if(c.description){
                        descRef.current.innerHTML = c.description;
                    }
                })
                .catch(err => {
                    console.log(err);
                    setLoader(false);
                    setErr('Serverda xatolik bor!');
                })
        }
        return () => {
            cancel = true;
            counter = 0;
        };
    }, [user, history.location.pathname]);

    useEffect(() => {
        return () => {
            if(updatedU) {
                console.log('useEffect')
                updatedU && setNewUser(updatedU);
            }
        }
    }, [history.location.pathname, setNewUser])

    // UTILITY FUNCTIONS
    const getUrl = (path) => {
        return `${baseURL}video/?${stringify({path: JSON.stringify(path)})}`;
    }
    const getDuration = () => {
        const spans = document.querySelectorAll('.dur');
        if(spans.length > 0) {
            spans.forEach(sp => {
                const video = sp.previousElementSibling;
                if(video) {
                    video.addEventListener('loadedmetadata', function() {
                        const dur = video.duration;
                        let min = Math.floor(dur / 60);
                        let hour;
                        if(min >= 60) {
                            hour = Math.floor(min / 60);
                            min = Math.floor(min - (hour * 60));
                            sp.textContent = `${hour}s ${min}min`
                        } else {
                            let sec = Math.floor(dur - (min * 60));
                            sp.textContent = `${min}min ${sec}sec`
                        }
                    });
                }
            })
        }
    }

    // Side Effects
    const changeActiveVideo = (currentTime, videoId) => {
        const config = {
            method: 'POST',
            headers: {Authorization: localStorage.getItem('token') },
            data: {currentTime, videoId, courseId: course._id}
        }
        axios('activeVideo', config)
            .then(res => {
                console.log('active video changed');
                updatedU = res.data.user;
            })
            .catch(err => {
                setErr('Serverda xatolik bor!');
                console.log(err);
            })
    }
    const videoFinished = (finished, video) => {
        const config = {
            method: 'POST',
            headers: {
                Authorization: localStorage.getItem('token')
            },
            data: {
                finished,
                videoId: video._id
            }
        }
        axios('videoFinished', config)
            .then(() => {})
            .catch(err => {
                setErr('Serverda xatolik bor!');
                console.log(err);
            })
    }
    const saveComment = (rating, text, ratingText) => {
        if(rating > 0) {
            const txt = text !== '' ? text : ratingText;
            const config = {
                method: 'POST',
                headers: {Authorization: localStorage.getItem('token') },
                data: {courseId: course._id, rating, text: txt}
            }
            axios('/commentAddEdit', config)
                .then(res => {
                    setCourse({
                        ...course,
                        comments: res.data.course.comments
                    });
                    setPlaying(true);
                    modalCloserRef.current.click();
                })
                .catch(err => {
                    console.log(err);
                    setErr('Serverda xatolik bor!');
                })
        } 
    }

    // State Change Methods
    const toggleFinished = (e, video) => {
        e.stopPropagation();
        const updatedVideos = course.videos.map(vd => {
            if(vd._id === video._id){
                return {
                    ...vd,
                    finished: !video.finished
                }
            } 
            return vd;
        });
        setCourse({
            ...course,
            videos: updatedVideos
        });
        videoFinished(!video.finished, video);
    }
    const setActiveVideo = (video, i, hasModal=false) => {
        if (i < course.videos.length){
            setActive({
                ...video,
                path: `${baseURL}video/?${stringify({path: JSON.stringify(video.videoUrl)})}`,
                finished: false
            });
            setPlaying(!hasModal);
            changeActiveVideo(0, video._id)
        } else {
            setPlaying(false);
        }
    }

    // Video Methods
    const onReady = () => {
        counter++
        if(counter === 1 && active){
            activeVideoRef.current.seekTo(active.currentTime, "seconds");
        }
    }
    const onEnded = () => {
        const i = course.videos.findIndex(vd => vd._id === active._id);
        const c = {...course};
        c.videos[i].finished= true;
        setCourse(c);
        let hasCommented = false
        course.comments.forEach(c => {
            if(c.userId === user._id){
                return hasCommented = true;
            }
        });
        if(((i + 1) % 5 === 0 && !hasCommented) || (i+1) === course.videos.length) {
            modalOpenerRef.current.click();
            setActiveVideo(course.videos[i+1], (i+1), true);
        } else {
            setActiveVideo(course.videos[i+1], i+1);
        }
        videoFinished(true, c.videos[i]);
    }
    const onPause = () => {
        clearTimeout(HTTP_Timer);
        const currentTime = activeVideoRef.current.getCurrentTime();
        const videoId = active._id;
        HTTP_Timer = setTimeout(() => {
            changeActiveVideo(currentTime, videoId);
        }, time)
    }
    const onSeek = () => {
        if(counter > 1) {
            clearTimeout(HTTP_Timer);
            const currentTime = activeVideoRef.current.getCurrentTime();
            const videoId = active._id;
            HTTP_Timer = setTimeout(() => {
                changeActiveVideo(currentTime, videoId);
            }, time)
        }
    }

    return (
        loader ? <div className="CB-Loader"><Loader /></div> :
        err ? <h1 className="CB-Error display-1">{err}</h1> :
        course && 
        <div className="CourseBought row">
            <div className="col-sm-9 CB-left pr-0">
                <div className="CB-video">
                    <Video 
                        ref={activeVideoRef}
                        playing={playing}
                        onReady={onReady}
                        onEnded={onEnded}
                        onPause={onPause}
                        onSeek={onSeek}
                        url={active.path}
                        controls
                        width="100%"/>
                </div>
                <div className="CB-bottom">
                    <Link 
                        to={`/course-preview/${course._id}`} 
                        className="CB-title">
                            {course.title}
                    </Link>
                    <h3 className="CB-headline d-none d-sm-block">{course.headline}</h3>
                    <div className="CP-DESC d-none d-sm-block" ref={descRef}></div>
                </div>
            </div>
           
            <div className="col-sm-3 CB-right pl-sm-0">
                <h2 className="CB-right_title">Course content</h2>
                <div className="CB-videoItem-wrapper">
                    {course.videos.map((vd, i) => (
                        <div 
                            key={vd._id} 
                            onClick={() => setActiveVideo(vd, i)}
                            className={`CB-videoItem ${active && active._id === vd._id ? 'CB-videoActive':''}`}>
                                <div className="VI-play">
                                    <img src={playUrl} alt="img"/>
                                </div>
                                <div className="VI-name">
                                    <video className="vHidden" src={getUrl(vd.videoUrl)}></video>
                                    {vd.name}
                                    <span className="dur">{getDuration()}</span>
                                </div>
                                <div 
                                    className="VI-finished ml-auto mr-5" 
                                    onClick={(e) => toggleFinished(e, vd)}>
                                    <img src={vd.finished ? finished : notFinished} alt="img" />
                                </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <CommentModal 
                modalOpenerRef={modalOpenerRef} 
                modalCloserRef={modalCloserRef}
                saveComment={saveComment}/>
        </div>
    )
}

const mapStateToProps = ({user}) => ({
    user
});

const mapDispatchToProps = dispatch => ({
    setNewUser: (payload) => dispatch(user(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CourseBought));