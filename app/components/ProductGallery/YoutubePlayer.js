import React from 'react';
import { View } from 'react-native';

export default function YoutubePlayer() {
    const [playing, setPlaying] = useState(false);
    return (
        <View>
            <YoutubePlayer height={300} play={playing} videoId="iee2TATGMyI" />
        </View>
    );
}
