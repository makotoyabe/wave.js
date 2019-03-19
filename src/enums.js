export const THREE_D_BASE_URL = "https://s3.us-west-2.amazonaws.com/threejs-editor";

export const THREE_D_STYLESHEETS = [
    {href: "editor/css/main.css"},
    {
        id: "theme",
        href: "editor/css/light.css"
    },
    {href: "editor/js/libs/codemirror/codemirror.css"},
    {href: "editor/js/libs/codemirror/theme/monokai.css"},
    {href: "editor/js/libs/codemirror/addon/dialog.css"},
    {href: "editor/js/libs/codemirror/addon/show-hint.css"},
    {href: "editor/js/libs/codemirror/addon/tern.css"},
];

export const THREE_D_SOURCES = [
    "examples/js/libs/system.min.js",
    "examples/js/controls/EditorControls.js",
    "examples/js/controls/TransformControls.js",
    "examples/js/libs/jszip.min.js",
    "examples/js/libs/inflate.min.js",
    "examples/js/loaders/AMFLoader.js",
    "examples/js/loaders/AWDLoader.js",
    "examples/js/loaders/BabylonLoader.js",
    "examples/js/loaders/ColladaLoader.js",
    "examples/js/loaders/DRACOLoader.js",
    "examples/js/loaders/FBXLoader.js",
    "examples/js/loaders/GLTFLoader.js",
    "examples/js/loaders/deprecated/LegacyGLTFLoader.js",
    "examples/js/loaders/KMZLoader.js",
    "examples/js/loaders/MD2Loader.js",
    "examples/js/loaders/OBJLoader.js",
    "examples/js/loaders/MTLLoader.js",
    "examples/js/loaders/PlayCanvasLoader.js",
    "examples/js/loaders/PLYLoader.js",
    "examples/js/loaders/STLLoader.js",
    "examples/js/loaders/SVGLoader.js",
    "examples/js/loaders/TGALoader.js",
    "examples/js/loaders/TDSLoader.js",
    "examples/js/loaders/VRMLLoader.js",
    "examples/js/loaders/VTKLoader.js",
    "examples/js/loaders/ctm/lzma.js",
    "examples/js/loaders/ctm/ctm.js",
    "examples/js/loaders/ctm/CTMLoader.js",
    "examples/js/exporters/ColladaExporter.js",
    "examples/js/exporters/GLTFExporter.js",
    "examples/js/exporters/OBJExporter.js",
    "examples/js/exporters/STLExporter.js",
    "examples/js/renderers/Projector.js",
    "examples/js/renderers/RaytracingRenderer.js",
    "examples/js/renderers/SoftwareRenderer.js",
    "examples/js/renderers/SVGRenderer.js",
    "editor/js/libs/codemirror/codemirror.js",
    "editor/js/libs/codemirror/mode/javascript.js",
    "editor/js/libs/codemirror/mode/glsl.js",
    "editor/js/libs/esprima.js",
    "editor/js/libs/jsonlint.js",
    "editor/js/libs/glslprep.min.js",
    "editor/js/libs/codemirror/addon/dialog.js",
    "editor/js/libs/codemirror/addon/show-hint.js",
    "editor/js/libs/codemirror/addon/tern.js",
    "editor/js/libs/acorn/acorn.js",
    "editor/js/libs/acorn/acorn_loose.js",
    "editor/js/libs/acorn/walk.js",
    "editor/js/libs/ternjs/polyfill.js",
    "editor/js/libs/ternjs/signal.js",
    "editor/js/libs/ternjs/tern.js",
    "editor/js/libs/ternjs/def.js",
    "editor/js/libs/ternjs/comment.js",
    "editor/js/libs/ternjs/infer.js",
    "editor/js/libs/ternjs/doc_comment.js",
    "editor/js/libs/tern-threejs/threejs.js",
    "editor/js/libs/signals.min.js",
    "editor/js/libs/ui.js",
    "editor/js/libs/ui.three.js",
    "editor/js/libs/html2canvas.js",
    "editor/js/libs/three.html.js",
    "editor/js/libs/app.js",
    "editor/js/Player.js",
    "editor/js/Script.js",
    "examples/js/vr/WebVR.js",
    "editor/js/Storage.js",
    "editor/js/Editor.js",
    "editor/js/Config.js",
    "editor/js/History.js",
    "editor/js/Loader.js",
    "editor/js/Menubar.js",
    "editor/js/Menubar.File.js",
    "editor/js/Menubar.Edit.js",
    "editor/js/Menubar.Add.js",
    "editor/js/Menubar.Play.js",
    "editor/js/Menubar.Examples.js",
    "editor/js/Menubar.Help.js",
    "editor/js/Menubar.Status.js",
    "editor/js/Sidebar.js",
    "editor/js/Sidebar.Scene.js",
    "editor/js/Sidebar.Project.js",
    "editor/js/Sidebar.Settings.js",
    "editor/js/Sidebar.Settings.Shortcuts.js",
    "editor/js/Sidebar.Settings.Viewport.js",
    "editor/js/Sidebar.Properties.js",
    "editor/js/Sidebar.Object.js",
    "editor/js/Sidebar.Geometry.js",
    "editor/js/Sidebar.Geometry.Geometry.js",
    "editor/js/Sidebar.Geometry.BufferGeometry.js",
    "editor/js/Sidebar.Geometry.Modifiers.js",
    "editor/js/Sidebar.Geometry.BoxGeometry.js",
    "editor/js/Sidebar.Geometry.CircleGeometry.js",
    "editor/js/Sidebar.Geometry.CylinderGeometry.js",
    "editor/js/Sidebar.Geometry.IcosahedronGeometry.js",
    "editor/js/Sidebar.Geometry.PlaneGeometry.js",
    "editor/js/Sidebar.Geometry.SphereGeometry.js",
    "editor/js/Sidebar.Geometry.TorusGeometry.js",
    "editor/js/Sidebar.Geometry.TorusKnotGeometry.js",
    "editor/js/Sidebar.Geometry.TubeGeometry.js",
    "examples/js/geometries/TeapotBufferGeometry.js",
    "editor/js/Sidebar.Geometry.TeapotBufferGeometry.js",
    "editor/js/Sidebar.Geometry.LatheGeometry.js",
    "editor/js/Sidebar.Material.js",
    "editor/js/Sidebar.Animation.js",
    "editor/js/Sidebar.Script.js",
    "editor/js/Sidebar.History.js",
    "editor/js/Strings.js",
    "editor/js/Toolbar.js",
    "editor/js/Viewport.js",
    "editor/js/Viewport.Info.js",
    "editor/js/Command.js",
    "editor/js/commands/AddObjectCommand.js",
    "editor/js/commands/RemoveObjectCommand.js",
    "editor/js/commands/MoveObjectCommand.js",
    "editor/js/commands/SetPositionCommand.js",
    "editor/js/commands/SetRotationCommand.js",
    "editor/js/commands/SetScaleCommand.js",
    "editor/js/commands/SetValueCommand.js",
    "editor/js/commands/SetUuidCommand.js",
    "editor/js/commands/SetColorCommand.js",
    "editor/js/commands/SetGeometryCommand.js",
    "editor/js/commands/SetGeometryValueCommand.js",
    "editor/js/commands/MultiCmdsCommand.js",
    "editor/js/commands/AddScriptCommand.js",
    "editor/js/commands/RemoveScriptCommand.js",
    "editor/js/commands/SetScriptValueCommand.js",
    "editor/js/commands/SetMaterialCommand.js",
    "editor/js/commands/SetMaterialValueCommand.js",
    "editor/js/commands/SetMaterialColorCommand.js",
    "editor/js/commands/SetMaterialMapCommand.js",
    "editor/js/commands/SetSceneCommand.js",
];
