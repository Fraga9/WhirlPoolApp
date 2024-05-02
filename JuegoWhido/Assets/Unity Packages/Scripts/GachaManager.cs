using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;

public class GachaManager : MonoBehaviour
{
    [SerializeField] private GachaRate[] gacha;
    [SerializeField] private Transform parent, pos;
    [SerializeField] private GameObject characterCardGO;
    GameObject characterCard;
    Cards card;

    void Start()
    {
        if(characterCard == null)
        {
            characterCard = Instantiate(characterCardGO, pos.position, Quaternion.identity) as GameObject;
            characterCard.transform.SetParent(parent);
            characterCard.transform.localScale = new Vector3(8,7,10);
            card = characterCard.GetComponent<Cards>();
        }
            
        int rnd = UnityEngine.Random.Range(1,101);
        for(int i=0; i<gacha.Length; i++)
        {
            if( rnd <= gacha[i].rate )
            {
                card.card = Reward(gacha[i].rarity);
                return;
            }
        }
    }
    cardInfo Reward(string rarity)
    {
        GachaRate gr = Array.Find(gacha, rt=> rt.rarity == rarity);
        cardInfo[] reward = gr.reward;

        int rnd = UnityEngine.Random.Range(0,reward.Length);

        return reward[rnd];
    }
}
