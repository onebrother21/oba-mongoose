
function runAPI {
  param(
    [Parameter(Mandatory)] [System.Collections.IDictionary] $Environment,
    [Parameter(Mandatory)] [scriptblock] $ScriptBlock
  )
  $htOrgEnv = @{}
  foreach ($kv in $Environment.GetEnumerator()) {
    $htOrgEnv[$kv.Key] = (Get-Item -EA SilentlyContinue "env:$($kv.Key)").Value
    Set-Item "env:$($kv.Key)" $kv.Value
  }
  try {
    & $ScriptBlock
  } finally {
    foreach ($kv in $Environment.GetEnumerator()) {
      Set-Item "env:$($kv.Key)" $htOrgEnv[$kv.Key]
    }
  }
}
$env = @{}
$msgUpdN = 1
switch($msgUpdN){
  1 {$msgUpd = "rebuilding with minor changes"}
  2 {$msgUpd = "rebuilding with major changes"}
  3 {$msgUpd = "package upgrade"}
}
$versionUpdN = 1
switch($versionUpdN){
  1 {$versionUpd = "patch"}
  2 {$versionUpd = "minor"}
  3 {$versionUpd = "major"}
}
runAPI $env {
  Set-Location "D:\ob\dev\oba-mongoose"
  Start-Process "cmd" -ArgumentList "/k npm run build && git add . && git commit -m `"$msgUpd`""
}