using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.EventSystems;

public class PersonajeMovimiento : MonoBehaviour
{
    [SerializeField] private float velocidad;
    public bool EnMovimiento => _direccionMovimiento.magnitude > 0f ;
    public Vector2 DireccionMovimiento => _direccionMovimiento;
    private Rigidbody2D _rigibody2D;
    private Vector2 _direccionMovimiento;
    private Vector2 _input;
    public Canva_Mov canva;
    
    private void Awake(){
        _rigibody2D = GetComponent<Rigidbody2D>();
        canva = FindObjectOfType<Canva_Mov>();
        if (canva == null)
        {
            Debug.LogError("No se encontró el script Canva_Mov en la escena.");
        }
        
    }
    void Start()
    {
    }

    // Update is called once per frame
    void Update()
    {
        if (canva.EsDerecha == true){
            _direccionMovimiento.x= 1f;
        }
        else if (canva.EsIzquierda == true){
            _direccionMovimiento.x = -1f;
        }
        else
        {
            _direccionMovimiento.x = 0f;
        }
        if (canva.EsArriba == true){
            _direccionMovimiento.y= 1f;
        }
        else if (canva.EsAbajo == true){
            _direccionMovimiento.y = -1f;
        }
        else
        {
            _direccionMovimiento.y = 0f;
        }
    }
    private void FixedUpdate(){
        _rigibody2D.MovePosition(_rigibody2D.position + _direccionMovimiento * velocidad * Time.fixedDeltaTime);
    }
}
