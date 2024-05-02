using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class NPC_Animacion : MonoBehaviour
{
    [SerializeField] private string layerIdle;
    [SerializeField] private string layerCaminar;
    private Animator _animator;
    private NPC_movimiento _personajemovimiento;

    private void Awake(){
        _animator = GetComponent<Animator>();
        _personajemovimiento = GetComponent<NPC_movimiento>();
    }

    
    void Update()
    {
        ActualizarLayers();

        if (_personajemovimiento.EnMovimiento == false)
        {
            return;
        }
        _animator.SetFloat(name:"X", _personajemovimiento.DireccionMovimiento.x);
        _animator.SetFloat(name:"Y", _personajemovimiento.DireccionMovimiento.y);
    }
    private void ActivarLayer(string nombreLayer){
        int layerIndex = _animator.GetLayerIndex(nombreLayer);
        if (layerIndex != -1)
         {
            for (int i = 0; i< _animator.layerCount; i++)
            {
                _animator.SetLayerWeight(i, weight:0);
            }
            _animator.SetLayerWeight(_animator.GetLayerIndex(nombreLayer),weight: 1);
            }
        else
        {
            Debug.LogWarning("La capa " + nombreLayer + " no existe en el animator.");
        }
    }
    private void ActualizarLayers()
    {
        if(_personajemovimiento.EnMovimiento)
        {
            ActivarLayer(layerCaminar);
        }
        else
        {
            ActivarLayer(layerIdle);
        }
    }
}
