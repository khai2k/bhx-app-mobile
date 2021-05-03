import { helper } from '@app/common';
import { MyText } from '@app/components';
import { Colors } from '@app/styles';
import React, { Component } from 'react';
import {
    Animated,
    Dimensions,
    Keyboard,
    Modal,
    Platform,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import CodePush from 'react-native-code-push';

const { width } = Dimensions.get('window');
const dialogWidth = width - 20;
const progressBarWidth = dialogWidth - 40;

const AnimatedMyText = Animated.createAnimatedComponent(MyText);

class CodePushUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateInfo: null,
            isMandatory: false,
            currentProgress: 0,
            syncMessage: '',
            updateStatus: 'None',
            animatedProgressValue: new Animated.Value(0),
            animatedOpacityValue: new Animated.Value(0),
            animatedScaleValue: new Animated.Value(0)
        };
        this.titles = this.titles.bind(this);
        this.show = this.show.bind(this);
        this.close = this.close.bind(this);
        this.hide = this.hide.bind(this);
        this.renderContent = this.renderContent.bind(this);
        this.renderBottom = this.renderBottom.bind(this);
        this.renderDescription = this.renderDescription.bind(this);
        this.immediateUpdate = this.immediateUpdate.bind(this);
        this.syncImmediate = this.syncImmediate.bind(this);
        this.restartNow = this.restartNow.bind(this);
    }

    componentDidMount() {
        this.syncImmediate();
        CodePush.getUpdateMetadata()
            .then((packageInfo) => {
                console.log('packageInfo', packageInfo);
                if (packageInfo) {
                    const { label, appVersion } = packageInfo;
                    const buildNumber = label.substring(1);
                    const version = `${appVersion} (${buildNumber})`;
                    console.log('version codePush :', version);
                }
            })
            .catch((err) => {
                console.log('err :', err);
            });
    }

    titles = (StateKey) => {
        let title = 'Phiên bản cập nhật !';
        switch (StateKey) {
            case 'Syncing':
                title = 'Phiên bản cập nhật đang tải !';
                break;
            case 'Update':
                title = 'Đã có phiên bản cập nhật mới !';
                break;
            case 'Updated':
                title = 'Phiên bản cập nhật đã được cài đặt thành công !';
                break;
            default:
                break;
        }
        return title;
    };

    close = (onClose = () => ({})) => {
        const { animatedOpacityValue, animatedScaleValue } = this.state;
        Animated.sequence([
            Animated.timing(animatedScaleValue, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true
            }),
            Animated.timing(animatedOpacityValue, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true
            })
        ]).start(() => this.setState({ updateStatus: 'None' }, onClose));
    };

    show = () => {
        const { animatedOpacityValue, animatedScaleValue } = this.state;
        Animated.sequence([
            Animated.timing(animatedOpacityValue, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true
            }),
            Animated.timing(animatedScaleValue, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true
            })
        ]).start();
    };

    hide = () => {
        this.close();
    };

    syncImmediate() {
        CodePush.checkForUpdate()
            .then((update) => {
                console.log('CODE PUSH: ', update);
                console.log(Keyboard.nativeEvent);
                if (update) {
                    if (
                        helper.hasProperty(update, 'failedInstall') &&
                        update.failedInstall
                    ) {
                        CodePush.clearUpdates();
                    }
                    setTimeout(() => {
                        Keyboard.dismiss();
                        this.setState(
                            {
                                updateInfo: update,
                                updateStatus: 'Update'
                            },
                            this.show
                        );
                    }, 1000);
                }
            })
            .catch((err) => {
                console.log('CODE PUSH: ', err);
            });
    }

    immediateUpdate = () => {
        if (this.state.updateStatus !== 'Syncing') {
            this.setState({ updateStatus: 'Syncing' }, () => {
                CodePush.sync(
                    { installMode: CodePush.InstallMode.ON_NEXT_RESUME },
                    this.codePushStatusDidChange.bind(this),
                    this.codePushDownloadDidProgress.bind(this)
                );
            });
        }
    };

    codePushStatusDidChange(syncStatus) {
        let syncMessage = '';
        switch (syncStatus) {
            case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
                syncMessage = 'Kiểm tra phiên bản cập nhật';
                break;
            case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
                syncMessage = 'Đang tải';
                break;
            case CodePush.SyncStatus.AWAITING_USER_ACTION:
                syncMessage = 'Để sau';
                break;
            case CodePush.SyncStatus.INSTALLING_UPDATE:
                syncMessage = 'Ứng dụng đã được cập nhật phiên bản mới!';
                break;
            case CodePush.SyncStatus.UP_TO_DATE:
                syncMessage = 'App up to date.';
                CodePush.notifyAppReady();
                break;
            case CodePush.SyncStatus.UPDATE_IGNORED:
                syncMessage = 'Quá trình bị huỷ bởi người dùng. ';
                break;
            case CodePush.SyncStatus.UPDATE_INSTALLED:
                syncMessage =
                    'Quá trình cập nhật đã thành công. Vui lòng khởi động lại ứng dụng!';
                CodePush.notifyAppReady();
                break;
            case CodePush.SyncStatus.UNKNOWN_ERROR:
                syncMessage = 'Đã xảy ra lỗi trong quá trình cập nhật';
                this.hide();
                return;
            default:
                break;
        }
        this.setState({ syncMessage });
    }

    codePushDownloadDidProgress(progress) {
        const { updateStatus, animatedProgressValue, isMandatory } = this.state;
        if (updateStatus === 'Syncing') {
            const { receivedBytes, totalBytes } = progress;
            const temp = receivedBytes / totalBytes;
            this.setState({ currentProgress: temp }, () => {
                if (temp >= 1) {
                    if (isMandatory) {
                        this.hide();
                    } else {
                        this.setState({ updateStatus: 'Updated' });
                    }
                } else {
                    animatedProgressValue.setValue(temp);
                }
            });
        }
    }

    renderDescription = () => {
        const { updateInfo } = this.state;
        if (updateInfo && updateInfo.description) {
            return (
                <View>
                    <MyText
                        style={styles.description}
                        text={`**** Ứng dụng đã sửa những lỗi : \n${updateInfo.description}`}
                        addSize={4}
                    />
                </View>
            );
        } else {
            <MyText
                style={styles.header}
                text="Ứng dụng đã có phiên bản cập nhật mới."
                addSize={4}
            />;
        }

        return null;
    };

    restartNow = () => {
        // this.close(() => {
        //     setTimeout(() => {
        //         RNRestart.Restart();
        //     }, 300);
        // });
        this.close(() => {
            CodePush.restartApp();
        });
    };

    renderBottom = () => {
        if (this.state.updateStatus === 'Updated') {
            return (
                <View
                    style={{
                        flex: 1,
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <TouchableOpacity
                        style={{
                            borderRadius: 50,
                            paddingVertical: 10,
                            paddingHorizontal: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: Colors.PRIMARY
                        }}
                        onPress={this.restartNow}>
                        <MyText
                            text="Đóng"
                            style={{ color: Colors.WHITE, fontWeight: 'bold' }}
                        />
                    </TouchableOpacity>
                </View>
            );
        }

        if (this.state.updateStatus === 'Syncing') {
            const {
                animatedProgressValue,
                syncMessage,
                currentProgress
            } = this.state;
            const translateX = animatedProgressValue.interpolate({
                inputRange: [0, 1],
                outputRange: [-progressBarWidth, 0]
            });
            const animationStyle = {
                transform: [{ translateX }]
            };
            const color = animatedProgressValue.interpolate({
                inputRange: [0, 0.3, 0.4, 0.5, 0.6],
                outputRange: ['white', '#474f61', '#474f61', '#474f61', 'white']
            });

            const roundedValue = (currentProgress * 100).toFixed(2);
            const progress = `${roundedValue}%`;
            return (
                <View style={{ alignItems: 'center' }}>
                    <View style={styles.progressBar}>
                        <Animated.View style={[styles.track, animationStyle]} />
                        <AnimatedMyText
                            style={[styles.progress, { color }]}
                            text={progress}
                        />
                    </View>
                    <MyText style={styles.msg} text={syncMessage} />
                </View>
            );
        }
        return (
            <View
                style={{
                    flex: 1,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <TouchableOpacity
                    style={{
                        borderRadius: 50,
                        paddingVertical: 10,
                        paddingHorizontal: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: Colors.PRIMARY
                    }}
                    onPress={this.immediateUpdate}>
                    <MyText
                        text="Đồng ý"
                        style={{ color: Colors.WHITE, fontWeight: 'bold' }}
                    />
                </TouchableOpacity>
            </View>
        );
    };

    renderContent = () => {
        const { updateStatus } = this.state;

        if (updateStatus === 'Updated') {
            return (
                <View style={styles.content}>
                    <MyText
                        style={styles.header}
                        text="Phiên bản cập nhật đã được cài đặt."
                        addSize={4}
                    />
                    <MyText
                        style={styles.confirmText}
                        text="Vui lòng tắt ứng dụng và mở lại để sử dụng phiên bản vừa được sửa lỗi."
                        addSize={4}
                    />
                </View>
            );
        }

        return (
            <View style={styles.content}>
                {this.renderDescription()}
                <MyText
                    style={styles.confirmText}
                    text="Vui lòng bấm đồng ý để cập nhật bản sửa lỗi mới."
                    addSize={3}
                />
            </View>
        );
    };

    getVersion = () => {
        const { updateInfo } = this.state;
        if (updateInfo) {
            const { label, appVersion } = updateInfo;
            const buildNumber = label.substring(1);
            const version = `Phiên bản: ${appVersion} (${buildNumber})`;
            return version;
        }
        return null;
    };

    render() {
        const {
            animatedOpacityValue,
            animatedScaleValue,
            updateStatus
        } = this.state;
        const visible = updateStatus !== 'None';
        const version = this.getVersion();

        const opacity = animatedOpacityValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 0.7, 1]
        });

        const opacityStyle = {
            opacity
        };

        const scale = animatedScaleValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
        });

        const scaleStyle = {
            transform: [{ scale }]
        };

        return (
            <Modal transparent visible={visible} onRequestClose={() => {}}>
                <Animated.View style={[styles.modal, opacityStyle]}>
                    <Animated.View style={[styles.container, scaleStyle]}>
                        <MyText
                            style={styles.title}
                            text={this.titles(this.state.updateStatus)}
                            addSize={8}
                        />
                        {version && (
                            <MyText style={styles.version} text={version} />
                        )}
                        {this.renderContent()}
                        <View style={styles.bottom}>{this.renderBottom()}</View>
                    </Animated.View>
                </Animated.View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    bottom: {
        alignItems: 'center',
        height: 80,
        justifyContent: 'center',
        width: '100%'
    },
    confirmText: {
        color: Colors.NIGHT_RIDER,
        marginBottom: 20,
        marginTop: 10,
        textAlign: 'center'
    },
    container: {
        alignItems: 'center',
        backgroundColor: Colors.WHITE,
        justifyContent: 'center',
        overflow: 'hidden',
        width: dialogWidth,
        ...Platform.select({
            android: {
                elevation: 4
            },
            ios: {
                shadowColor: Colors.COLOR_000000,
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.2,
                shadowRadius: 6
            }
        }),
        borderRadius: 14
    },
    content: {
        marginHorizontal: 20,
        marginTop: 10
    },
    description: {
        color: Colors.NIGHT_RIDER,
        textAlign: 'left'
    },
    header: {
        color: Colors.PRIMARY,
        textAlign: 'center'
    },
    modal: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        backgroundColor: Colors.COLOR_353638,
        justifyContent: 'center'
    },
    msg: {
        color: Colors.NIGHT_RIDER,
        marginTop: 8,
        textAlign: 'center'
    },
    progress: {
        color: Colors.TEA_GREEN,
        textAlign: 'center'
    },
    progressBar: {
        alignItems: 'center',
        backgroundColor: Colors.AZURE,
        borderRadius: 8,
        justifyContent: 'center',
        overflow: 'hidden',
        width: progressBarWidth
    },
    title: {
        color: Colors.PRIMARY,
        marginHorizontal: 20,
        marginTop: 20,
        textAlign: 'center'
    },
    track: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        color: Colors.JACKSONS_PURPLE,
        justifyContent: 'center',
        padding: 4 * 3
    },
    version: {
        color: Colors.NIGHT_RIDER,
        marginTop: 4
    }
});

const codePushOptions = {
    checkFrequency: CodePush.CheckFrequency.MANUAL
};

export default CodePush(codePushOptions)(CodePushUpdate);
