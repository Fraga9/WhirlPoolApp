using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class NPC_movimiento : MonoBehaviour
{
    [SerializeField] private float velocidad;
    public float tiempoDeEspera;
    public bool EnMovimiento => _direccionMovimiento.magnitude > 0f ;
    public Vector2 DireccionMovimiento => _direccionMovimiento;
    private Rigidbody2D _rigibody2D;
    private Vector2 _direccionMovimiento;
    private Vector2 _input;
    

    private void Awake(){
        _rigibody2D = GetComponent<Rigidbody2D>();
        _rigibody2D.constraints = RigidbodyConstraints2D.FreezeRotation;
    }
    void Start()
    {
        ActualizarMovimiento();
    }
    private void ActualizarMovimiento()
    {
        _direccionMovimiento = new Vector2(Random.Range(-1f, 1f), Random.Range(-1f, 1f)).normalized;
        
        Invoke("ActualizarMovimiento", tiempoDeEspera);
    
    }
    
    
    private void FixedUpdate(){
        _rigibody2D.MovePosition(_rigibody2D.position + _direccionMovimiento * velocidad * Time.fixedDeltaTime);
        
    }
}
