<!DOCTYPE html>
<html lang="es-ES">
<head>
    <meta charset="utf-8">
</head>
<body>
<h2>{{ $data['subject'] }}</h2>

<div>
    <p>
      {{ $data['name']}} ha enviado un correo electronico.
    </p>
    <p>
      Email de contacto: {{ $data['email']}}
    </p>
    <p>
      Telefono de contacto: {{ $data['phone']}}
    </p>
    <p>
      Dirección de contacto.: {{ $data['address']}}
    </p>
    <h3>Mensaje de Contacto</h3>
    <p>
      {{ $data['message'] }}
    </p>
</div>

</body>
</html>
