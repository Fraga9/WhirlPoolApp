using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PersonajeAnimacion : MonoBehaviour
{
    [SerializeField] private string layerIdle;
    [SerializeField] private string layerCaminar;
    private Animator _animator;
    private PersonajeMovimiento _personajemovimiento;

    private void Awake(){
        _animator = GetComponent<Animator>();
        _personajemovimiento = GetComponent<PersonajeMovimiento>();
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
        for (int i = 0; i< _animator.layerCount; i++)
        {
            _animator.SetLayerWeight(i, weight:0);
        }
        _animator.SetLayerWeight(_animator.GetLayerIndex(nombreLayer),weight: 1);
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
