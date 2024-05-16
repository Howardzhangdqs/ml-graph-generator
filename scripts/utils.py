
import pathlib, os

def toAbsolutePath(path: str):
    return str(pathlib.Path(os.path.join(str(pathlib.Path(__file__).parent.absolute()), path)).absolute())