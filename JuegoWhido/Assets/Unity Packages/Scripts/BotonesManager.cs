using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BotonesManager : MonoBehaviour
{
    public Botones B;
    public int intentos = 10;
   void Awake()
    {
        DontDestroyOnLoad(this.gameObject);
        B = FindObjectOfType<Botones>();
        if (B == null)
        {
            Debug.LogError("No se encontró el script Botones en la escena.");
        }
    }
}
