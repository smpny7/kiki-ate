import { data } from 'data'
import { getDownloadURL, ref } from 'firebase/storage'
import { useState } from 'react'
import ReactJkMusicPlayer, {
    ReactJkMusicPlayerInstance,
    ReactJkMusicPlayerProps,
} from 'react-jinke-music-player'
import { Button, Container, FlexboxGrid, List, Navbar } from 'rsuite'
import { firebaseStorage } from './firebase/init'

function App() {
    const handleDownload = (src: string) => {
        const uri = ref(firebaseStorage, src)
        return getDownloadURL(uri)
    }

    const [audioInstance, setAudioInstance] =
        useState<ReactJkMusicPlayerInstance>()

    const getAudioInstance = (instance: ReactJkMusicPlayerInstance) => {
        setAudioInstance(instance)
    }

    const audioLists = data.map((item) => {
        return {
            name: item.name,
            singer: item.singer,
            cover: item.cover,
            musicSrc: () => handleDownload(item.song),
            lyrics: item.lyrics,
        }
    })

    const playerOptions: ReactJkMusicPlayerProps = {
        audioLists: audioLists,
        autoPlay: false,
        defaultPlayMode: 'singleLoop',
        getAudioInstance: getAudioInstance,
        glassBg: true,
        mode: 'full',
        remember: true,
        remove: false,
        showThemeSwitch: false,
        showLyric: true,
        showMediaSession: true,
        spaceBar: true,
        toggleMode: false,
        theme: 'light',
    }

    return (
        <div>
            <Navbar appearance="inverse">
                <Navbar.Brand>聴きあて</Navbar.Brand>
            </Navbar>
            <ReactJkMusicPlayer {...playerOptions} />
            <Container>
                <List className="pb-20" hover>
                    {data.map((item, index) => (
                        <List.Item key={item.name} index={index + 1}>
                            <FlexboxGrid>
                                {/* Cover */}
                                <FlexboxGrid.Item colspan={2}>
                                    <img
                                        src={item.cover}
                                        alt={item.name}
                                        className="mx-auto w-1/2 rounded"
                                    />
                                </FlexboxGrid.Item>

                                {/* Name */}
                                <FlexboxGrid.Item colspan={4}>
                                    <h2 className="text-lg">{item.name}</h2>
                                </FlexboxGrid.Item>

                                {/* Lyrics */}
                                <FlexboxGrid.Item colspan={12}>
                                    <p>{item.lyrics}</p>
                                </FlexboxGrid.Item>

                                {/* Singer */}
                                <FlexboxGrid.Item colspan={2}>
                                    <p>{item.singer}</p>
                                </FlexboxGrid.Item>

                                {/* Year */}
                                <FlexboxGrid.Item colspan={2}>
                                    <p>{item.year}</p>
                                </FlexboxGrid.Item>

                                {/* Button */}
                                <FlexboxGrid.Item colspan={2}>
                                    <Button
                                        onClick={() => {
                                            if (
                                                audioInstance &&
                                                audioInstance.updatePlayIndex
                                            )
                                                audioInstance.updatePlayIndex(
                                                    index,
                                                )
                                        }}
                                    >
                                        再生
                                    </Button>
                                </FlexboxGrid.Item>
                            </FlexboxGrid>
                        </List.Item>
                    ))}
                </List>
            </Container>
        </div>
    )
}

export default App
