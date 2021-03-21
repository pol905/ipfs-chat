# IPFS CHAT

Communication being the basic requirement in the present generation along with privacy, it become imperative to have a effecient system which ensures both. Untill now we used to follow a centeralized system architecture which worked well; but technology improved, newer ways to implement this became available. Decenteralized systems ensure we overcome a centeral authority in the whole process. This makes sure all the data isn’t stored in one place
as well as keep everything secure.

The proposed system provides a platform for users to have the same experience in comminication amongst others
but on a better and more secure network. Decentralization of the current applications is picking up pace in the world
as more and more advantages of using this is coming to light. As there is not central authority moderating the data
on the network there is complete freedom to share anything the user wants. 

Data privacy is a significant issue in today’s centralized architecture. Peer-to-peer networks are one of the solutions to decentralize the Internet, making each connection become autonomous and anonymous. While there are many challenges to this protocol due to the way our Internet is configured, there are also proposed solutions to solve. One of the biggest challenges is NAT, which blocks unwelcoming requests from outside world to our computer. While
this is beneficial in terms of security, it also blocks Peer-to-peer transmission. The main idea of the proposed system is to not compromise the current user’s experience, but to enhance and migrate them to a decentralized network. 


## EXISTING SYSTEM
Existing systems work on the principal of keeping persistent TCP connection between users and server to facilitate communication between end users. Whatsapp recently claimed to have reached a capacity of one million established TCP connection on a single machine. This method is expensive and not feasible as to ensure continued growth, these systems need to be added with extra machines to handle such connections. This will increase in cost and usage of electrcity which isn’t ecofriendly. If we include redundent systems for backup’s the number just increases. Also a big concern in such centralized system architecture is security, as all the data is stored in central servers they are prone to attack

## PROPOSED SYSTEM

Unlike the existing systems, the proposed systems aims to use decentralized networks to overcome these shortcoming that currently present. This approach requires minimal number of servers which are mainly used only for discovery of nodes; not storing or transmitting of data. This ensures security of data as well as provides us with a more feasible working approach. The proposed system is built using the LibP2P network stack, which is a peer to peer
network. This network provides a “plug and play” option to the users. Users can use any form of transports, multiplexers, security frameworks.

### ADVANTAGES OF PROPOSED SYSTEM

## No censorship:

Making the content distributed between peers, no company, no authority can prevent you from accessing it anymore. Protecting the Data not the wire. In the old HTTP model security is achieved by the means of implementing SSL protocol which leads to HTTPS where the wire (the route) between you and the server is safe, but no one really thought about the data being saved.

## Data integrity:
 
IPFS use a cryptographic hash of your content which assure you that the data didn’t change even a bit. 3.2.3 Less bandwidth and less cost:
In the old HTTP model of moving files imagine we are moving a big file like a video file all over the network. These scenarios had happened like on youtube when we have more than 1billion watched video clip. Can you calculate how much bandwidth is wasted just moving the file across the network all the ways to users? What if someone is watching it for many times? He will endup moving the same file to the same device over and over again. Can you now calculate how much this big wasted bandwidth cost? It can lead to millions wasted for the users all over the world and even for companies when they
have to strive to maintain big data movement just for a short time period. Having IPFS as protocol to share files in a distributed manner we can have the file downloaded one time for each network and start having peers exchanging the bits of files in that network until they all have it, not wasting bandwidth of global network, and not wasting money on data moving many many times.


## Project Demo: [Click Here](https://still-base-8151.on.fleek.co/)

## Getting Started/Installing

To set up the project, first pull the project from the git repository using the command below.
### `git clone https://github.com/pol905/IPFS-CHAT.git" 

To install all the dependencies run the commands in the project directory.
### 'yarn install' 
or
### 'npm install'

After the installation is completed, to start the development environment run the command below:

### 'yarn start'
or  
### 'npm start'
It will run the start script and start the development server.

To view it on browser open:
[http://localhost:3000](http://localhost:3000)

Any changes done will recomplie and can be viewed on this link.

### Built with

* [React] - Used for building the UI framework.
* [IPFS] - Protocol used for the data transfer in the network.
* [Lip2p] - Used to create a peer to peer network
* [OrbitDB] - Serverless, distributed P2P database.
* [Metamask] - Used for transfer of Ethereum based cryptocurrency.

