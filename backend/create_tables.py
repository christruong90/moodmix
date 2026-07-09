from app.core.database import Base, engine
from app.models import User, Playlist, Room, RoomMember, MoodLog

print("Creating tables...")
Base.metadata.create_all(bind=engine)
print("Done.")
