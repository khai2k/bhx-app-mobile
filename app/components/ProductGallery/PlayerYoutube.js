import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import Icon from 'react-native-vector-icons/FontAwesome';

const playerWidth = Dimensions.get('window').width;
const playerHeight = (playerWidth / 16) * 9;

export default function PlayerYoutube(props) {
    const { index, currentShowIndex, LinkVideo } = props;
    const [playing, setPlaying] = useState(true);
    const [isEmbedVideo, setIsEmbedVideo] = useState(false);
    const pauseVideo = () => {
        if (index !== currentShowIndex) {
            if (playing) {
                setPlaying(false);
            }
        }
    };
    useEffect(() => {
        pauseVideo();
    }, [currentShowIndex]);
    return (
        <View style={styles.buttonPlayVideoContainer}>
            {!isEmbedVideo ? (
                <TouchableOpacity
                    onPress={() => setIsEmbedVideo(true)}
                    style={{ zIndex: 1000 }}>
                    <View style={{ opacity: 0.5 }}>
                        <Icon name="play-circle" size={100} color="black" />
                    </View>
                </TouchableOpacity>
            ) : (
                <View style={styles.containerPlayer}>
                    <YoutubePlayer
                        height={playerHeight}
                        play={playing}
                        videoId={LinkVideo}
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    buttonPlayVideoContainer: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 13
    },
    containerPlayer: {
        width: '100%',
        zIndex: 1000
    }
});
