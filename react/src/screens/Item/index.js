import React, { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./Item.module.sass";
import Users from "./Users";
import Control from "./Control";
import Options from "./Options";
import Web3Init from "../../components/InitWeb3";
import PhotoNFTData from "../../ABI/PhotoNFTData.json";

const navLinks = ["Info", "Owners", "History", "Offers"];

const categories = [
  {
    category: "black",
    content: "art",
  },
  {
    category: "purple",
    content: "unlockable",
  },
];

const users = [
  {
    name: "Raquel Will",
    position: "Owner",
    avatar: "/images/content/avatar-2.jpg",
    reward: "/images/content/reward-1.svg",
  },
  {
    name: "Selina Mayert",
    position: "Creator",
    avatar: "/images/content/avatar-1.jpg",
  },
];

const Item = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [ItemData, setItemData] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  useEffect( async () => {
    const web3 = await Web3Init();
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    if (PhotoNFTData.networks) {
      const deployedNetwork = PhotoNFTData.networks[networkId.toString()];
      const photoNFTData = new web3.eth.Contract(
        PhotoNFTData.abi,
        deployedNetwork && deployedNetwork.address
      );
      if (deployedNetwork) {
        const ItemData = await photoNFTData.methods.getPhotoByNFTAddress("0xC03eFcDf3D826B197cA65A57a0FbCf3C7CE48e04").call();
        setItemData(ItemData);
        if (ItemData.ownerAddress == accounts[0]) setIsOwner(true);
      }
    }
  }, [])
  return (
    <>
      {
        ItemData.length &&
        <div className={cn("section", styles.section)}>
          <div className={cn("container", styles.container)}>
            <div className={styles.bg}>
              <div className={styles.preview}>
                <div className={styles.categories}>
                  {categories.map((x, index) => (
                    <div
                      className={cn(
                        { "status-black": x.category === "black" },
                        { "status-purple": x.category === "purple" },
                        styles.category
                      )}
                      key={index}
                    >
                      {x.content}
                    </div>
                  ))}
                </div>
                <img
                  srcSet="/images/content/item-pic@2x.jpg 2x"
                  src={`http://localhost:8080/ipfs/${ItemData.ipfsHashOfPhoto}`}
                  alt="Item"
                />
              </div>
              <Options className={styles.options} isOwner={isOwner} />
            </div>
            <div className={styles.details}>
              <h1 className={cn("h3", styles.title)}>{ItemData.photoNFTName}</h1>
              <div className={styles.cost}>
                <div className={cn("status-stroke-green", styles.price)}>
                  2.5 ETH
                </div>
                <div className={cn("status-stroke-black", styles.price)}>
                  $4,429.87
                </div>
                <div className={styles.counter}>10 in stock</div>
              </div>
              <div className={styles.info}>{ItemData.photoNFTDesc}</div>
              <div className={styles.nav}>
                {navLinks.map((x, index) => (
                  <button
                    className={cn(
                      { [styles.active]: index === activeIndex },
                      styles.link
                    )}
                    onClick={() => setActiveIndex(index)}
                    key={index}
                  >
                    {x}
                  </button>
                ))}
              </div>
              <Users className={styles.users} items={users} />
              <Control className={styles.control} isOwner={isOwner} />
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default Item;
