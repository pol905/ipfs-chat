import Libp2p from "libp2p";
import Bootstrap from "libp2p-bootstrap";
import Websockets from "libp2p-websockets";
import WebRTCStar from "libp2p-webrtc-star";
import GossipSub from "libp2p-gossipsub";
import KadDHT from "libp2p-kad-dht";
import MPLEX from "libp2p-mplex";
import { NOISE } from "libp2p-noise";
import PubsubPeerDiscovery from "libp2p-pubsub-peer-discovery";

const libp2pBundle = (opts) => {
    const peerId = opts.peerId;
    const bootstrapList = opts.config.Bootstrap;
    const topics = ["_chat_app._p2p._pubsub"];
    return new Libp2p({
        peerId,
        addresses: {
            listen: [
                "/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star/",
            ],
        },
        modules: {
            transport: [Websockets, WebRTCStar],
            streamMuxer: [MPLEX],
            connEncryption: [NOISE],
            peerDiscovery: [Bootstrap, PubsubPeerDiscovery],
            dht: KadDHT,
            pubsub: GossipSub,
        },
        config: {
            peerDiscovery: {
                bootstrap: {
                    interval: 30e3,
                    enabled: true,
                    list: bootstrapList,
                },
                [WebRTCStar.tag]: {
                    enabled: true,
                },
                PubsubPeerDiscovery: {
                    interval: 3000,
                    topics: topics,
                },
            },
            pubsub: {
                emitSelf: false,
                enabled: true,
            },
        },
    });
};

export default libp2pBundle;
