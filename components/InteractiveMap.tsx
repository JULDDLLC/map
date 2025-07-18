'use client'

import { useEffect, useState } from 'react'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import { supabase, Pin } from '@/lib/supabase'
import { motion } from 'framer-motion'

const geoUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json'

const stateCoordinates: { [key: string]: [number, number] } = {
  Alabama: [-86.79113, 32.377716],
  Alaska: [-152.404419, 61.370716],
  Arizona: [-111.431221, 33.729759],
  Arkansas: [-92.373123, 34.969704],
  California: [-119.681564, 36.116203],
  Colorado: [-105.311104, 39.059011],
  Connecticut: [-72.755371, 41.767],
  Delaware: [-75.507141, 39.161921],
  Florida: [-81.686783, 27.766279],
  Georgia: [-83.643074, 33.76],
  Hawaii: [-155.844437, 19.741755],
  Idaho: [-114.478828, 44.240459],
  Illinois: [-89.094842, 40.094],
  Indiana: [-86.147685, 40.269789],
  Iowa: [-93.620866, 42.032974],
  Kansas: [-96.726486, 38.572954],
  Kentucky: [-84.670067, 37.839333],
  Louisiana: [-91.8, 30.45809],
  Maine: [-69.765261, 44.323535],
  Maryland: [-76.501157, 39.045755],
  Massachusetts: [-71.530106, 42.230171],
  Michigan: [-84.536095, 44.182205],
  Minnesota: [-94.6859, 46.729553],
  Mississippi: [-89.678696, 32.741646],
  Missouri: [-92.189283, 38.572954],
  Montana: [-110.454353, 47.042418],
  Nebraska: [-99.901813, 41.492537],
  Nevada: [-116.419389, 38.313515],
  'New Hampshire': [-71.549709, 43.452492],
  'New Jersey': [-74.756138, 40.221741],
  'New Mexico': [-106.018066, 34.51994],
  'New York': [-74.948051, 42.659829],
  'North Carolina': [-78.638, 35.771],
  'North Dakota': [-99.784012, 47.528912],
  Ohio: [-82.764915, 40.269789],
  Oklahoma: [-96.921387, 35.482309],
  Oregon: [-120.767, 43.964],
  Pennsylvania: [-77.209755, 40.269789],
  'Rhode Island': [-71.422132, 41.82355],
  'South Carolina': [-81.035, 33.836082],
  'South Dakota': [-99.901813, 44.299782],
  Tennessee: [-86.784, 35.860119],
  Texas: [-97.76, 31.106],
  Utah: [-111.892622, 39.161921],
  Vermont: [-72.710686, 44.0],
  Virginia: [-78.169968, 37.769337],
  Washington: [-121.1, 47.042418],
  'West Virginia': [-80.954453, 38.349497],
  Wisconsin: [-89.616861, 44.268543],
  Wyoming: [-107.30249, 42.755966]
}

export default function InteractiveMap() {
  const [pins, setPins] = useState<Pin[]>([])
  const [hoveredState, setHoveredState] = useState<string | null>(null)

  useEffect(() => {
    fetchPins()
    
    // Real-time updates disabled in demo mode
    // const channel = supabase
    //   .channel('pins')
    //   .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'pins' }, (payload) => {
    //     const newPin = payload.new as Pin
    //     if (newPin.approved) {
    //       setPins(prev => [...prev, newPin])
    //     }
    //   })
    //   .subscribe()

    // return () => {
    //   supabase.removeChannel(channel)
    // }
  }, [])

  const fetchPins = async () => {
    // Demo mode - return empty pins array
    setPins([])
  }

  const getStateColor = (stateName: string) => {
    const statePins = pins.filter(pin => pin.state === stateName)
    if (statePins.length === 0) return 'rgba(0, 255, 240, 0.1)'
    if (statePins.length < 5) return 'rgba(0, 255, 240, 0.2)'
    if (statePins.length < 10) return 'rgba(255, 215, 0, 0.2)'
    return 'rgba(255, 89, 248, 0.2)'
  }

  return (
    <motion.div 
      className="w-full max-w-4xl mx-auto map-container"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <ComposableMap
        projection="geoAlbersUsa"
        projectionConfig={{
          scale: 800,
        }}
        width={800}
        height={500}
        style={{
          width: '100%',
          height: 'auto',
        }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const stateName = geo.properties.name
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={getStateColor(stateName)}
                  stroke="rgba(0, 255, 240, 0.3)"
                  strokeWidth={0.5}
                  style={{
                    default: {
                      outline: 'none',
                    },
                    hover: {
                      fill: 'rgba(0, 255, 240, 0.3)',
                      stroke: 'rgba(0, 255, 240, 0.6)',
                      outline: 'none',
                    },
                    pressed: {
                      outline: 'none',
                    },
                  }}
                  onMouseEnter={() => setHoveredState(stateName)}
                  onMouseLeave={() => setHoveredState(null)}
                />
              )
            })
          }
        </Geographies>
        
        {pins.map((pin) => {
          const coordinates = stateCoordinates[pin.state]
          if (!coordinates) return null
          
          return (
            <Marker key={pin.id} coordinates={coordinates}>
              <motion.g
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <circle
                  r={6}
                  fill="var(--brand-gold)"
                  stroke="var(--brand-cyan)"
                  strokeWidth={2}
                  style={{
                    filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.6))',
                  }}
                />
                <text
                  textAnchor="middle"
                  y={-10}
                  fontSize="12"
                  fill="white"
                  style={{
                    fontFamily: 'system-ui',
                    fontWeight: 'bold',
                    textShadow: '0 0 4px rgba(0, 0, 0, 0.8)',
                  }}
                >
                  🐼
                </text>
              </motion.g>
            </Marker>
          )
        })}
      </ComposableMap>
      
      {hoveredState && (
        <motion.div
          className="absolute top-4 left-4 glass-card p-3 text-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <p className="font-bold text-brand-cyan">{hoveredState}</p>
          <p className="text-white/80">
            {pins.filter(pin => pin.state === hoveredState).length} pins
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}